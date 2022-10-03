import mongoose from "mongoose";
const Schema = mongoose.Schema;
// Define the schema for users
const messageSchema = new Schema({
    content: String,
});
// Create the model from the schema and export it
export default mongoose.model("Message", messageSchema);