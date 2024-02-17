import courseModel from '../../../models/mainCategoryModel.js';
import { serverError } from '../../../utils/errorHandler.js';

export const getCourseTable = async (req, res) => {
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

		const universities = await courseModel.aggregate(aggregationPipeline);

		if (!universities || universities.length === 0) {
			return res.status(200).json({
				success: false,
				message: 'No courses found',
				data: {},
			});
		}
		const [result] = universities;

		return res.status(200).json({
			success: true,
			message: 'Courses data fetched',
			data: { courses: result.paginatedResults, totalCount: result.totalCount.at(0)?.count, currentPage: page },
		});
	} catch (error) {
		return serverError(error);
	}
};
