import alumniModel from '../../../models/vendorModel.js';
import { serverError } from '../../../utils/errorHandler.js';

export const getAlumniTable = async (req, res) => {
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
			// {
			// 	$project: {
			// 		_id: 1,
			// 		question: 1,
			// 		answer: 1,
			// 	},
			// },
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

		const alumnis = await alumniModel.aggregate(aggregationPipeline);

		if (!alumnis || alumnis.length === 0) {
			return res.status(200).json({
				success: false,
				message: 'No alumni found',
				data: {},
			});
		}
		const [result] = alumnis;

		return res.status(200).json({
			success: true,
			message: 'Alumni data fetched',
			data: { alumnis: result.paginatedResults, totalCount: result.totalCount.at(0)?.count, currentPage: page },
		});
	} catch (error) {
		return serverError(error);
	}
};
