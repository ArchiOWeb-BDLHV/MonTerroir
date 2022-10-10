import mongoose from 'mongoose';
const Schema = mongoose.Schema;
// Define the schema for users
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
});

userSchema.statics.findByName = function(name) {
    return this.find({ name: new RegExp(name, 'i') });
};
// Create the model from the schema and export it
export default mongoose.model('User', userSchema);