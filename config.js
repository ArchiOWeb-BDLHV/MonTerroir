import * as dotenv from 'dotenv';

dotenv.config();

export default {
    port: process.env.PORT || 3000,
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 27017,
        name: process.env.DB_NAME || 'test',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
    },
    jwt: {
        secret: process.env.APP_KEY || 'secret',
        expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    },
};