import Jwt from "jsonwebtoken";
import config from "../../../config.js";


export function authenticated(req, res, next) { //authenticated est un middleware qui vérifie si l'utilisateur est authentifié
    const authHeader = req.headers['authorization']; // on récupère le header sous la forme "Bearer {token}"
    const token = authHeader && authHeader.split(' ')[1]; // on récupère le token

    if (token == null) return res.status(401).json({ message: "Unauthorized. Please login." }); // si le token est null, on renvoie une erreur

    Jwt.verify(token, config.jwt.secret, (err, user) => {
        if (err) return res.status(403).json({ message: "Forbidden. Invalid token." }); // si le token est invalide, on renvoie une erreur
        req.user = user // on ajoute l'utilisateur à la requête
        next() // on passe à la suite
    })
}