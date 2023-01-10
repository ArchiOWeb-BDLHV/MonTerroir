import User from './user.js';
import mongoose from 'mongoose';
import { Role } from './role.js';
import crypto from "crypto";

const productorSchema = new mongoose.Schema({
    role: {
        type: Number,
        default: 2,
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
    }],

}, {
    toObject: {
        transform: function(doc, ret) {
            delete ret.__v;
            delete obj.password;
            delete obj.role;
            delete obj.conversations;
            delete obj.updatedAt;
            delete obj.createdAt;
            delete obj.type;

        }
    },
    toJSON: {
        transform: function(doc, ret) {
            delete ret.__v;
            delete obj.password;
            delete obj.role;
            delete obj.conversations;
            delete obj.updatedAt;
            delete obj.createdAt;
            delete obj.type;
        }
    }
});

productorSchema.statics.withAverageRating = function() {
    return this.aggregate([{
            $lookup: {
                from: "reviews",
                localField: "_id",
                foreignField: "product",
                as: "reviews",
            },
        },
        {
            $addFields: {
                averageRating: {
                    $avg: "$reviews.score",
                },
            },
        },
    ]);
}

productorSchema.statics.createFake = async function({ password = "password", location = { type: "Point", coordinates: [0, 0] } } = {}) {
    const username = crypto.randomBytes(20).toString('hex');
    return await this.create({
        username: username,
        password: password,
        role: Role.PRODUCTOR,
        location: location,
    });
}

/* 
productorSchema.methods.cleanPrivateFields = function() {
    delete this.password;
    delete this.__v;
    delete this.role;
    delete this.conversations;
    delete this.updatedAt;
    return this;
}; */

export default User.discriminator('Productor', productorSchema);