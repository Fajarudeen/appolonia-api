import mongoose from 'mongoose';
import dayjs from 'dayjs';
import { serverError } from '../../utils/errorHandler.js';
import { EmployeeModel } from '../../models/employeeModel.js';

export const createEmployee = async (req, res, next) => {
	try {
		const { firstName, lastName, email, phone, address } = req.body;

		await EmployeeModel.create({
			firstName: firstName,
			lastName: lastName,
			email: email,
			phone: phone,
			address: address,
			deletedAt: null,
		});

		return res.status(200).json({
			success: true,
			message: 'Employee added successfully',
		});
	} catch (error) {
		return next(serverError(error));
	}
};

export const updateEmployee = async (req, res, next) => {
	try {
		const employeeId = req.params.id;
		const { firstName, lastName, email, phone, address } = req.body;

		const employee = await EmployeeModel.findById({ _id: employeeId, deletedAt: null });

		if (!employee) {
			return res.status(404).json({
				success: false,
				message: 'Employee not found',
			});
		}
		employee.firstName = firstName;
		employee.lastName = lastName;
		employee.email = email;
		employee.phone = phone;
		employee.address = address;

		await employee.save();

		return res.status(200).json({
			success: true,
			message: 'Employee data updated',
		});
	} catch (error) {
		return next(serverError(error));
	}
};

export const deleteEmployee = async (req, res, next) => {
	try {
		const employeeId = req.params.id;
		const employee = await EmployeeModel.findById(employeeId);

		if (!employee) {
			return res.status(404).json({
				success: false,
				message: 'Employee not found',
			});
		}
		employee.deletedAt = dayjs();
		await employee.save();

		return res.status(200).json({
			success: true,
			message: 'Employee data deleted',
		});
	} catch (error) {
		return next(serverError(error));
	}
};

export const getEmployeeById = async (req, res, next) => {
	try {
		const employeeId = new mongoose.Types.ObjectId(req.params.id);

		const employee = await EmployeeModel.aggregate([
			{
				$match: {
					_id: employeeId,
				},
			},
		]);

		if (employee.length > 0) {
			return res.status(200).json({
				success: true,
				message: 'Employee data fetched',
				data: { employee: employee.at(0) },
			});
		}
		return res.status(404).json({
			success: false,
			message: 'Employee not found',
			data: {},
		});
	} catch (error) {
		return next(serverError(error));
	}
};
