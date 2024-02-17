import multer from 'multer';
import { getUploadDir } from '../../fileUtils.js';
import slugify from 'slugify';

export const uploadImageFile = (path) => {
	const whitelist = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

	return multerFileUploader(whitelist, path);
};
export const uploadPdfFile = (path) => {
	const whitelist = ['application/pdf', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'];

	return multerFileUploader(whitelist, path);
};

function multerFileUploader(whitelist, path) {
	const storage = multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, getUploadDir(path));
		},
		filename: function (req, file, cb) {
			const name = slugify(file.originalname, { lower: true });
			cb(null, Date.now() + '-' + name);
		},
	});
	const fileFilter = (req, file, cb) => {
		if (!whitelist.includes(file.mimetype)) {
			return cb(new Error('file type is not allowed'));
		}
		cb(null, true);
	};

	return multer({ storage: storage, fileFilter: fileFilter });
}
