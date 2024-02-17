import bcrypt from 'bcryptjs';
import authModel from '../models/authModel.js';
import env from '../env.js';

export const createAdmin = async () => {
	const adminExists = await authModel.find();

	if (!adminExists) {
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(env.ADMIN_PASSWORD, salt);

		const newUser = new authModel({
			password: hash,
			email: env.ADMIN_EMAIL,
		});
		await newUser.save();
	}
};
