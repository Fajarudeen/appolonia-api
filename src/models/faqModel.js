import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema(
	{
		question: {
			type: String,
			required: true,
		},
		answer: {
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

export default mongoose.model('Faqs', faqSchema);
