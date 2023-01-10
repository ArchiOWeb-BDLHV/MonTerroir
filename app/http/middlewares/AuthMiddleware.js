import createDebugger from 'debug';
import Jwt from "jsonwebtoken";
import config from "../../../config.js";
import User from "../../models/user.js";

const debug = createDebugger('express-api:testing');

export function authenticated(req, res, next) { //authenticated est un middleware qui vérifie si l'utilisateur est authentifié
    const authHeader = req.headers['authorization']; // on récupère le header sous la forme "Bearer {token}"
    const token = authHeader && authHeader.split(' ')[1]; // on récupère le token

    if (token == null) return res.status(401).json({ message: "Unauthorized. Please login." }); // si le token est null, on renvoie une erreur

    Jwt.verify(token, config.jwt.secret, async(err, res) => {
        if (!err) {
            const _user = await User.findById(res.id) // on ajoute l'utilisateur à la requête
            req.user = _user;
            return next() // on passe à la suite

        }
        const error = new Error("Forbidden. Invalid token.");
        error.status = 403;
        next(error); // si le token est invalide, on renvoie une erreur
    })
}

export function tokenToUser(req) {

    //get the token in the req query 
    let token = req.query.token;
    console.log(token)
    if (!token) {
        const authHeader = req.headers['authorization'];
        if (!authHeader) return null;

        token = authHeader.split(' ')[1];
    }
    if (!token) return null;

    return new Promise((resolve, reject) => {
        Jwt.verify(token, config.jwt.secret, async(err, res) => {
            if (err) reject(err);
            const _user = await User.findById(res.id)
            resolve(_user);
        })
    })
}