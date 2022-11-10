import mongoose from "mongoose";
const Schema = mongoose.Schema;

const categorySchema = new Schema({
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
    products: [{
        type: Schema.Types.ObjectId,
        ref: "Product",
    }, ],
});

categorySchema.statics.findByName = function(name) {
    return this.find({ name: new RegExp(name, "i") });
};

categorySchema.statics.createFake = async function() {
    return await this.create({
        name: "Fake category",
    });
}


export default mongoose.model("Category", categorySchema);