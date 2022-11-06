import Category from "../app/models/category.js";
import Message from "../app/models/message.js";
import Product from "../app/models/product.js";
import Review from "../app/models/review.js";
import User from "../app/models/user.js";

export const cleanUpDatabase = async function() {
    await Promise.all([
        User.deleteMany(),
        Review.deleteMany(),
        Message.deleteMany(),
        Product.deleteMany(),
        Category.deleteMany(),
    ]);
};