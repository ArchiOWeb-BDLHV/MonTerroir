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
    category: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return v.length > 2 && v.length <= 70;
            },
            message: (props) =>
                `${props.value} is not a valid category! Category must be between 3 and 70 characters.`,
        },
    },
    image_url: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return v.length > 2;
            },
            message: (props) =>
                `${props.value} is not a valid image_url! Image_url must be bigger than 3 characters.`,
        },
    },
});

// Create the model from the schema and export it
export default mongoose.model("Product", productSchema);