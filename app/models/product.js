import mongoose from "mongoose";
const Schema = mongoose.Schema;
// Define the schema for users
const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return v.length > 2 && v.length <= 70;
            },
            message: (props) =>
                `${props.value} is not a valid name! Name must be between 3 and 70 characters.`,
        },
    },
    description: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return v.length > 2;
            },
            message: (props) =>
                `${props.value} is not a valid description! Description must be bigger than 3 characters.`,
        },
    },
    price: {
        type: Number,
        required: true,
        min: [
            0.05,
            "is not a valid prince! The minimum amount is 0.05.- and you sent {VALUE}",
        ],
    },
    categories: [{
        type: Schema.Types.ObjectId,
        ref: "Category",
    }, ],
    images: [{
        type: Schema.Types.ObjectId,
        ref: "Image",
    }, ],
    productor: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review",
    }, ],
});

productSchema.statics.findByName = function(name) {
    return this.find({ name: new RegExp(productSchema, "i") });
};


productSchema.statics.withAverageRating = function() {
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



// Create the model from the schema and export it
export default mongoose.model("Product", productSchema);