import User from "../app/models/user.js";
import Jwt from "jsonwebtoken";
import config from "../config.js";
import Review from "../app/models/review.js";
import Message from "../app/models/message.js";
import Product from "../app/models/product.js";
import Category from "../app/models/category.js";

export const cleanUpDatabase = async function() {
    await Promise.all([
        User.deleteMany(),
        Review.deleteMany(),
        Message.deleteMany(),
        Product.deleteMany(),
        Category.deleteMany(),
    ]);
};