import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
	{
		blogName: {
			type: String,
			required: true,
		},
		blogLink: {
			type: String,
			required: true,
		},
		blogDesc: {
			type: String,
			required: true,
		},
		blogImage: {
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

export default mongoose.model('Blogs', blogSchema);
