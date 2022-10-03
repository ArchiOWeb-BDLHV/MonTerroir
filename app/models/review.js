import mongoose from 'mongoose';

const Schema = mongoose.Schema;
// Define the schema for reviews
const reviewSchema = new Schema({
    score: Number,
    message: String
});
// Create the model from the schema and export it
export default mongoose.model('Review', reviewSchema);