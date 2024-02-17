import mongoose from 'mongoose';

const universitySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		country: {
			type: String,
			required: true,
		},
		facts: {
			type: String,
			required: true,
		},
		awards: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		campusInfo: {
			type: String,
			required: true,
		},
		universityLogo: {
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

export default mongoose.model('Universities', universitySchema);
