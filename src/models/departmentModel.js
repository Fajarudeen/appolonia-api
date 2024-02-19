import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema(
	{
		department: {
			type: String,
			required: true,
		},
		section: {
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

export const DepartmentModel = mongoose.model('departments', departmentSchema);
