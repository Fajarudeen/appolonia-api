import winston, { format } from 'winston';

const logger = winston.createLogger({
	level: 'info', // Level of messages to log. Can be: error, warn, info, verbose, debug, silly
	format: format.combine(
		format.align(),
		format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
		format.prettyPrint(),
		format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] }),
	),
	transports: [
		// Write all logs error (and below) to `error.log`.
		new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
		// Write all logs info (and below) to `combined.log`.
		new winston.transports.File({ filename: 'logs/combined.log' }),
	],
});

// in development also log to the `console`
if (process.env.NODE_ENV !== 'production') {
	logger.add(
		new winston.transports.Console({
			format: format.combine(
				format.align(),
				format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
				format.colorize(),
				format.prettyPrint(),
				format.simple(),
			),
		}),
	);
}

export default logger;
