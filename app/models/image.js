import mongoose from "mongoose";
import config from "../../config";
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

imageSchema.methods.toJSON = function() {
    var obj = this.toObject();
    obj.url = config.appUrl + obj.url;
    return obj;
}

// Create the model from the schema and export it
export default mongoose.model("Image", imageSchema);