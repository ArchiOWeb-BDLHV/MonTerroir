import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the schema for users
const messageSchema = new Schema({
    content: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return v.length > 1 && v.length <= 400;
            },
            message: props => `${props.value} is not a valid message! Message must be between 1 and 400 characters.`
        },
    },
    date: {
        type: Date,
        default: Date.now,
    },
    conversation: {
        type: Schema.Types.ObjectId,
        ref: 'Conversation',
        required: true
    },
});

// Create the model from the schema and export it
export default mongoose.model("Message", messageSchema);