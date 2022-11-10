import User from './user.js';
import mongoose from 'mongoose';

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


export default User.discriminator('Productor', productorSchema);