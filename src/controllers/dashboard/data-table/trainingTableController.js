import trainingModel from '../../../models/serviceModel.js';
import { serverError } from '../../../utils/errorHandler.js';

export const getTrainingTable = async (req, res) => {
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

		const trainings = await trainingModel.aggregate(aggregationPipeline);

		if (!trainings || trainings.length === 0) {
			return res.status(200).json({
				success: false,
				message: 'No trainings found',
				data: {},
			});
		}
		const [result] = trainings;

		return res.status(200).json({
			success: true,
			message: 'Training data fetched',
			data: { trainings: result.paginatedResults, totalCount: result.totalCount.at(0)?.count, currentPage: page },
		});
	} catch (error) {
		return serverError(error);
	}
};
