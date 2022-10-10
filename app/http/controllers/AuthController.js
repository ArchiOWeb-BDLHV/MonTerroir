import config from "../../../config.js";
import User from "../../models/user.js";
import Jwt from "jsonwebtoken";

function generateAccessToken(username) {
    return Jwt.sign(username, config.jwt.secret, { expiresIn: config.jwt.expiresIn });
}

export function authenticated(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({ message: "Unauthorized. Please login." });

    Jwt.verify(token, config.jwt.secret, (err, user) => {
        console.log(err)

        if (err) return res.status(403).json({ message: "Forbidden. Invalid token." });

        req.user = user

        next()
    })
}

export async function login(req, res) {
    const { username, password } = req.body;

    if (!(username && password)) {
        return res.status(422).json({ error: 'Username and password are required' });
    } else {
        const user = await User.findOneByUsername(username);
        if (!user) {
            return res.status(401).json({ error: 'Username or password incorrect' });
        }

        user.comparePassword(password, (err, isMatch) => {
            if (err) {
                return res.status(401).json({ error: 'Username or password incorrect' });
            } else {
                const accessToken = generateAccessToken({ username: user.username, role: user.role });
                return res.json({ user, accessToken });
            }
        });
    }
}

export async function register(req, res) {

    const { username, password } = req.body;

    console.warn(req.body)

    if (!(username && password)) {
        res.status(422).json({ message: 'Username and password are required' });
    } else {
        const doesUserExist = await User.findOneByUsername(username);
        console.warn({ doesUserExist });
        if (doesUserExist) {
            res.status(401).json({ message: 'Username already taken' });
        } else {
            const accessToken = generateAccessToken({ username, role: 'user' });
            const user = new User({
                username: req.body.username,
                password: req.body.password,
            });
            user.save();
            res.json({
                user,
                accessToken
            });
        }
    }
}