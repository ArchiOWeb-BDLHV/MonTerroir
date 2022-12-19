import * as dotenv from 'dotenv';

dotenv.config();

export default {
    port: process.env.PORT || 3000,
    db: {
        connection: process.env.DB_CONNECTION || 'mongodb://localhost:27017/express-api',
    },
    jwt: {
        secret: process.env.APP_KEY || 'secret',
        expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    },
    appUrl: process.env.APP_URL,
};