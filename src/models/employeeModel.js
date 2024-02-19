import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema(
	{
		deptId: {
			type: mongoose.Types.ObjectId,
		},
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		deletedAt: {
			type: Date,
			required: false,
		},
	},
	{ timestamps: true },
);

export const EmployeeModel = mongoose.model('employees', employeeSchema);
