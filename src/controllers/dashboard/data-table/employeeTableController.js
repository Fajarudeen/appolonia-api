import { EmployeeModel } from '../../../models/employeeModel.js';
import { serverError } from '../../../utils/errorHandler.js';

export const getEmployeeTable = async (req, res) => {
	try {
		const page = Math.abs(Number.parseInt(req.query.page) || 1);
		const pageSize = 15;

		const aggregationPipeline = [
			{
				$match: { deletedAt: null },
			},
			{
				$sort: { createdAt: -1 },
			},
			{
				$facet: {
					paginatedResults: [{ $skip: (page - 1) * pageSize }, { $limit: pageSize }],
					totalCount: [
						{
							$count: 'count',
						},
					],
				},
			},
		];

		const employees = await EmployeeModel.aggregate(aggregationPipeline);

		if (!employees || employees.length === 0) {
			return res.status(200).json({
				success: false,
				message: 'No employee found',
				data: {},
			});
		}
		const [result] = employees;

		return res.status(200).json({
			success: true,
			message: 'Employee data fetched',
			data: { employees: result.paginatedResults, totalCount: result.totalCount.at(0)?.count, currentPage: page },
		});
	} catch (error) {
		return serverError(error);
	}
};
