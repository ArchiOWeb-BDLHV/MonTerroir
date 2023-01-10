import mongoose from "mongoose";
import config from "./../../config.js";
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
}, {
    toObject: {
        transform: function(doc, ret) {
            ret.url = config.appUrl + ret.url;
        }
    },
    toJSON: {
        transform: function(doc, ret) {
            ret.url = config.appUrl + ret.url;
        }
    }
});

// Create the model from the schema and export it
export default mongoose.model("Image", imageSchema);