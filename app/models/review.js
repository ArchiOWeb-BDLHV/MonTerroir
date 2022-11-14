import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Define the schema for reviews
const reviewSchema = new Schema({
    score: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    message: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return v.length > 0 && v.length <= 1000;
            },
            message: props => `${props.value} is not a valid message! Message must be between 1 and 1000 characters.`
        },
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: false,
    },
    productor: {
        type: Schema.Types.ObjectId,
        ref: 'Productor',
        required: false,
    },
});

reviewSchema.statics.getAverage = async function(type, value) {
    return (await this.aggregate([{
            $match: {
                [type]: mongoose.Types.ObjectId(value),
            }
        },
        { $group: { _id: value, score: { $avg: "$score" } } },



    ]))[0];
}

// Create the model from the schema and export it
export default mongoose.model('Review', reviewSchema);