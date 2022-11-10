import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the schema for users
const imageSchema = new Schema({
    url: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return v.length > 1;
            },
            message: (props) => `${props.value} is not a valid URL!`,
        },
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

// Create the model from the schema and export it
export default mongoose.model("Image", imageSchema);