import * as dotenv from 'dotenv';
import { cleanEnv, port, str } from 'envalid';

dotenv.config();

const env = cleanEnv(process.env, {
	ENV: str({ choices: ['local', 'production'], default: 'local' }),
	PORT: port({ default: 4545 }),
	JWT_SECRET_KEY: str({
		default:
			'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJlbWFpbCI6ImFkbWluQGVtYy5jb20ifQ.xCyQt3wQXRj8NojG-m26LS9GktX90VBxU15BoxLuTS8',
	}),
	JWT_EXPIRES: str({ default: '7 days' }),
	ADMIN_EMAIL: str({ default: 'admin@ikounselor.com' }),
	ADMIN_PASSWORD: str({ default: 'admin' }),
});

export default env;
