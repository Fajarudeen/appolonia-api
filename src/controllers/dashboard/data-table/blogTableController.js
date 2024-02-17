import blogsModel from '../../../models/mainCategoryModel.js';
import { serverError } from '../../../utils/errorHandler.js';

export const getBlogTable = async (req, res) => {
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

		const blogs = await blogsModel.aggregate(aggregationPipeline);

		if (!blogs || blogs.length === 0) {
			return res.status(200).json({
				success: false,
				message: 'No blogs found',
				data: {},
			});
		}
		const [result] = blogs;

		return res.status(200).json({
			success: true,
			message: 'Blogs data fetched',
			data: { blogs: result.paginatedResults, totalCount: result.totalCount.at(0)?.count, currentPage: page },
		});
	} catch (error) {
		return serverError(error);
	}
};
