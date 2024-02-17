import mongoose from 'mongoose';

const vendorSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true,
		},
		affiliations: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		alumniImage: {
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

export default mongoose.model('Vendors', vendorSchema);
