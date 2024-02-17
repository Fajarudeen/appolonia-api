import mongoose from 'mongoose';
import dayjs from 'dayjs';
import { serverError } from '../../utils/errorHandler.js';
import path from 'path';
import vendorModel from '../../models/vendorModel.js';

export const createAlumni = async (req, res, next) => {
	try {
		const { fullName, affiliations, description } = req.body;
		const imageFile = 'uploads' + req.file.path.split(path.sep + 'uploads').at(1);

		const alumni = await vendorModel.create({
			fullName: fullName,
			affiliations: affiliations,
			description: description,
			alumniImage: imageFile,
			deletedAt: null,
		});

		return res.status(200).json({
			success: true,
			message: 'Alumni added successfully',
			data: { almni: alumni },
		});
	} catch (error) {
		return next(serverError(error));
	}
};

export const updateAlumni = async (req, res, next) => {
	try {
		const alumniId = req.params.id;
		const { fullName, affiliations, description } = req.body;

		const alumni = await categoryModel.findById({ _id: alumniId, deletedAt: null });

		if (!alumni) {
			return res.status(404).json({
				success: false,
				message: 'Alumni not found',
			});
		}
		let imageFile = req.body.profileImage;
		if (req.file) {
			imageFile = 'uploads' + req.file.path.split(path.sep + 'uploads').at(1);
		}
		alumni.fullName = fullName;
		alumni.affiliations = affiliations;
		alumni.description = description;
		alumni.alumniImage = imageFile;

		await alumni.save();

		return res.status(200).json({
			success: true,
			message: 'Alumni data updated',
		});
	} catch (error) {
		return next(serverError(error));
	}
};

export const deleteAlumni = async (req, res, next) => {
	try {
		const alumniId = req.params.id;
		const alumni = await categoryModel.findById(alumniId);

		if (!alumni) {
			return res.status(404).json({
				success: false,
				message: 'Alumni not found',
			});
		}
		alumni.deletedAt = dayjs();
		await alumni.save();

		return res.status(200).json({
			success: true,
			message: 'Alumni data deleted',
		});
	} catch (error) {
		return next(serverError(error));
	}
};

export const getAlumniById = async (req, res, next) => {
	try {
		const alumniId = new mongoose.Types.ObjectId(req.params.id);

		const alumni = await alumniModel.aggregate([
			{
				$match: {
					_id: alumniId,
				},
			},
		]);

		if (alumni.length > 0) {
			return res.status(200).json({
				success: true,
				message: 'Alumni data fetched',
				data: { alumni: alumni.at(0) },
			});
		}
		return res.status(404).json({
			success: false,
			message: 'Alumni not found',
			data: {},
		});
	} catch (error) {
		return next(serverError(error));
	}
};
