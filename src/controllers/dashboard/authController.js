import authModel from '../../models/authModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import env from '../../env.js';

export const postAuthentication = async (req, res) => {
	try {
		const reqEmail = req.body.email.trim();
		const reqPassword = req.body.password.trim();

		const user = await authModel.findOne({ email: reqEmail });

		if (!user) {
			return res.status(401).json({
				success: false,
				message: 'Authentication failed. User not found.',
			});
		}

		const isPasswordValid = bcrypt.compareSync(reqPassword, user.password);

		if (!isPasswordValid) {
			return res.status(401).json({
				success: false,
				message: 'Authentication failed. Invalid password.',
			});
		}

		const accessToken = jwt.sign({ userId: user._id }, env.JWT_SECRET_KEY, { expiresIn: env.JWT_EXPIRES });
		const userData = { email: user.email, role: 'admin' };

		return res.status(200).json({
			success: true,
			accessToken,
			userData,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			success: false,
			message: 'Error authenticating',
		});
	}
};

export const validateToken = async (req, res) => {
	try {
		const accessToken = req.headers.authorization;
		const { userId } = req.user;

		const user = await authModel.findById(userId);

		if (!user) {
			return res.status(401).json({
				success: false,
				message: 'Authentication failed. User not found.',
			});
		}

		const userData = { email: user.email, role: 'admin' };

		return res.status(200).json({
			success: true,
			accessToken,
			userData,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			success: false,
			message: 'Error authenticating',
		});
	}
};

export const getAuthDetails = async (req, res) => {
	try {
		const authDetails = await authModel.find({});

		return res.status(200).json({
			success: true,
			data: { authDetails: authDetails },
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			success: false,
			message: 'Error fetching',
		});
	}
};

export const updatePassword = async (req, res) => {
	try {
		const { email } = req.body.values;
		const oldPassword = req.body.values.old_password;
		const newPassword = req.body.values.new_password;
		const confirmedPassword = req.body.values.confirmed_password;

		// Find the user by email
		const user = await authModel.findOne({ email: email });

		if (!user) {
			return res.status(404).json({
				success: false,
				message: 'There is no user with this email',
			});
		}

		// Check if old_password matches the stored hashed password
		const isPasswordValid = bcrypt.compareSync(oldPassword, user.password);
		const isPasswordSame = bcrypt.compareSync(newPassword, user.password);

		if (!isPasswordValid) {
			return res.status(201).json({
				success: false,
				message: 'Old password is incorrect',
			});
		}
		if (isPasswordSame) {
			return res.status(201).json({
				success: false,
				message: 'Old password and new password are cannot be same',
			});
		}
		if (newPassword !== confirmedPassword) {
			return res.status(201).json({
				success: false,
				message: 'new password and confirm password are not same',
			});
		}

		// Generate a new hash for the new password
		const salt = bcrypt.genSaltSync(10);
		const newHash = bcrypt.hashSync(newPassword, salt);

		// Update the user's password
		user.password = newHash;
		await user.save();

		return res.status(200).json({
			success: true,
			message: 'Password updated successfully',
		});
	} catch (err) {
		console.error(err);
		return res.status(500).json({
			success: false,
			message: 'Error updating password',
		});
	}
};
