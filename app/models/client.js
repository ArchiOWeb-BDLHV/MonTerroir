import User from './user.js';
import mongoose from 'mongoose';

export default User.discriminator('Client', new mongoose.Schema({
    role: {
        type: Number,
        default: 1,
    },
}));