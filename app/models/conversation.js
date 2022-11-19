import mongoose from 'mongoose';
import crypto from 'crypto';

const Schema = mongoose.Schema;

// Define the schema for reviews
const conversationSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }],

});

conversationSchema.statics.findMine = function(user) {
    return this.find().where('_id').in(user.conversations)
};

conversationSchema.statics.createFake = function({ users = [] } = {}) {
    return this.create({
        name: crypto.randomBytes(20).toString('hex'),
        users: users,
    });
}



// Create the model from the schema and export it
export default mongoose.model('Conversation', conversationSchema);