import mongoose from 'mongoose';
import dayjs from 'dayjs';
import { serverError } from '../../utils/errorHandler.js';
import faqModel from '../../models/faqModel.js';

export const createFaq = async (req, res, next) => {
	try {
		const { question, answer } = req.body;
		const faq = await faqModel.create({
			question: question,
			answer: answer,
			deletedAt: null,
		});

		return res.status(200).json({
			success: true,
			message: 'Faq added successfully',
			data: { faq: faq },
		});
	} catch (error) {
		return next(serverError(error));
	}
};

export const updateFaq = async (req, res, next) => {
	try {
		const faqId = req.params.id;
		const { question, answer } = req.body;

		const faq = await faqModel.findById({ _id: faqId, deletedAt: null });

		if (!faq) {
			return res.status(404).json({
				success: false,
				message: 'Data not found',
			});
		}

		faq.question = question;
		faq.answer = answer;
		await faq.save();

		return res.status(200).json({
			success: true,
			message: 'Answer data updated',
		});
	} catch (error) {
		return next(serverError(error));
	}
};

export const deleteFaq = async (req, res, next) => {
	try {
		const faqId = req.params.id;
		const faqData = await faqModel.findById(faqId);

		if (!faqData) {
			return res.status(404).json({
				success: false,
				message: 'Faq not found',
			});
		}
		faqData.deletedAt = dayjs();
		await faqData.save();

		return res.status(200).json({
			success: true,
			message: 'Faq data deleted',
		});
	} catch (error) {
		return next(serverError(error));
	}
};

export const getFaqById = async (req, res, next) => {
	try {
		const faqId = new mongoose.Types.ObjectId(req.params.id);

		const faqData = await faqModel.aggregate([
			{
				$match: {
					_id: faqId,
				},
			},
		]);

		if (faqData.length > 0) {
			return res.status(200).json({
				success: true,
				message: 'Faq data fetched',
				data: { faq: faqData.at(0) },
			});
		}
		return res.status(404).json({
			success: false,
			message: 'Faq not found',
			data: {},
		});
	} catch (error) {
		return next(serverError(error));
	}
};
