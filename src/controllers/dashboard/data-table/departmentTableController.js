import { DepartmentModel } from '../../../models/DepartmentModel.js';
import { serverError } from '../../../utils/errorHandler.js';

export const getDepartmentTable = async (req, res) => {
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

		const departments = await DepartmentModel.aggregate(aggregationPipeline);

		
		if (!departments || departments.length === 0) {
			return res.status(200).json({
				success: false,
				message: 'No department found',
				data: {},
			});
		}
		const [result] = departments;

		return res.status(200).json({
			success: true,
			message: 'Department data fetched',
			data: { departments: result.paginatedResults, totalCount: result.totalCount.at(0)?.count, currentPage: page },
		});
	} catch (error) {
		return serverError(error);
	}
};
