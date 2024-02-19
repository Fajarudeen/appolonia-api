import mongoose from 'mongoose';
import dayjs from 'dayjs';
import { serverError } from '../../utils/errorHandler.js';
import { DepartmentModel } from '../../models/DepartmentModel.js';

export const createDepartment = async (req, res, next) => {
	try {
		const { department, section } = req.body;

		const departmentData = await DepartmentModel.create({
			department: department,
			section: section,
			deletedAt: null,
		});

		return res.status(200).json({
			success: true,
			message: 'Department added successfully',
			data: { department: departmentData },
		});
	} catch (error) {
		return next(serverError(error));
	}
};

export const updateDepartment = async (req, res, next) => {
	try {
		const departmentId = req.params.id;
		const { department, section } = req.body;

		const departmentData = await DepartmentModel.findById({ _id: departmentId, deletedAt: null });

		if (!departmentData) {
			return res.status(404).json({
				success: false,
				message: 'Department not found',
			});
		}

		departmentData.department = department;
		departmentData.section = section;

		await departmentData.save();

		return res.status(200).json({
			success: true,
			message: 'Department data updated',
		});
	} catch (error) {
		return next(serverError(error));
	}
};

export const deleteDepartment = async (req, res, next) => {
	try {
		const departmentId = req.params.id;
		const department = await DepartmentModel.findById(departmentId);

		if (!department) {
			return res.status(404).json({
				success: false,
				message: 'Department not found',
			});
		}
		department.deletedAt = dayjs();
		await department.save();

		return res.status(200).json({
			success: true,
			message: 'Department data deleted',
		});
	} catch (error) {
		return next(serverError(error));
	}
};

export const getDepartmentById = async (req, res, next) => {
	try {
		const departmentId = new mongoose.Types.ObjectId(req.params.id);

		const departmentData = await DepartmentModel.aggregate([
			{
				$match: {
					_id: departmentId,
				},
			},
		]);

		if (departmentData.length > 0) {
			return res.status(200).json({
				success: true,
				message: 'Department data fetched',
				data: { department: departmentData.at(0) },
			});
		}
		return res.status(404).json({
			success: false,
			message: 'Department not found',
			data: {},
		});
	} catch (error) {
		return next(serverError(error));
	}
};
