import env from './src/env.js';
import ConnectDB from './src/config/db.js';
import express from 'express';
import cors from 'cors';
import { cwd } from 'process';
import mongoSanitize from 'express-mongo-sanitize';
import compression from 'compression';
import helmet from 'helmet';

const app = express();

app.use(cors());
app.use(express.json());
app.use(mongoSanitize());
app.use(compression());
app.use('/uploads', express.static(cwd() + '/uploads', { maxAge: 31557600 }));
app.use(
	helmet({
		crossOriginEmbedderPolicy: false,
		crossOriginResourcePolicy: { policy: 'cross-origin' },
		contentSecurityPolicy: {
			directives: {
				// eslint-disable-next-line quotes
				defaultSrc: ["'self'"],
				// eslint-disable-next-line quotes
				imgSrc: ["'self'", 'data:', '*.ubnhb.in'],
				// eslint-disable-next-line quotes
				connectSrc: ["'self'", '*.ubnhb.in'],
			},
		},
	}),
);

const { PORT } = env;

app.get('/', (req, res) => {
	res.send('Hey We Made It !');
});

app.use((req, res, next) => {
	const error = new Error('Not Found');
	error.status = 404;
	next(error);
});

//error handler
app.use((err, req, res, next) => {
	if (err.status === 404) {
		// Page Not Found
		res.status(404).json({
			success: false,
			message: 'Page Not Found kfyifuyj',
		});
	} else {
		const errorStatus = err.status || 500;
		const errorMessage = err.message || 'Something went wrong';
		res.status(errorStatus).json({
			success: false,
			status: errorStatus,
			message: errorMessage,
		});
	}
	next();
});
ConnectDB();
app.listen(PORT, () => {
	console.log(`Server listening to the port ${PORT}`);
});
