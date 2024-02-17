import logger from './logger.js';
import { statusCode } from './statusCode.js';

export const customError = (status, message) => {
	const err = new Error();
	err.status = status;
	err.message = message;
	return err;
};

export const validationError = (message) => {
	const err = new Error();
	err.status = statusCode.validationError;
	err.message = message;
	return err;
};

export const serverError = (error, message = 'Internal Server Error') => {
	logger.error(message, error);
	const err = new Error();
	err.status = statusCode.serverError;
	err.message = message;
	return err;
};
