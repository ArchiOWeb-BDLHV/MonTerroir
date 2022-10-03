import mongoose from "mongoose";
const Schema = mongoose.Schema;
// Define the schema for users
const productSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    category: String,
    image_url: String,
});
// Create the model from the schema and export it
export default mongoose.model("Product", productSchema);