import User from "../app/models/user.js";
import Jwt from "jsonwebtoken";
import config from "../config.js";

export const cleanUpDatabase = async function() {
    await Promise.all([
        User.deleteMany()
    ]);
};