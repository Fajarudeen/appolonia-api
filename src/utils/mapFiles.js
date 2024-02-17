import set from 'lodash/set.js';

export const mapFiles = (req, _res, next) => {
	if (Array.isArray(req.files)) {
		req.files = req.files.reduce((map, { fieldname, ...file }) => set(map, fieldname, file), {});
	}

	next();
};
