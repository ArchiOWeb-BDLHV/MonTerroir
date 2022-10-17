import config from "../../../config.js";
import User from "../../models/user.js";
import Jwt from "jsonwebtoken";

function generateAccessToken(username) {
    return Jwt.sign(username, config.jwt.secret, { expiresIn: config.jwt.expiresIn }); // Generation du token d'authentification
}

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

export async function login(req, res) {
    const { username, password } = req.body; // on récupère le username et le password dans le body de la requête

    if (!(username && password)) {
        return res.status(422).json({ error: 'Username and password are required' }); // si le username ou le password est manquant, on renvoie une erreur
    } else {
        const user = await User.findOneByUsername(username); // on récupère l'utilisateur correspondant au username
        if (!user) {
            return res.status(401).json({ error: 'Username or password incorrect' }); // si l'utilisateur n'existe pas, on renvoie une erreur
        }

        user.comparePassword(password, (err, isMatch) => {
            if (err) {
                return res.status(401).json({ error: 'Username or password incorrect' }); // si le mot de passe est incorrect, on renvoie une erreur
            } else {
                const accessToken = generateAccessToken({ username: user.username, role: user.role }); // on génère un token
                return res.json({ user, accessToken }); // on renvoie l'utilisateur et le token
            }
        });
    }
}

export async function register(req, res) {

    const { username, password } = req.body; // on récupère le username et le password dans le body de la requête

    if (!(username && password)) {
        res.status(422).json({ message: 'Username and password are required' }); // si le username ou le password est manquant, on renvoie une erreur
    } else {
        const doesUserExist = await User.findOneByUsername(username); // on vérifie si l'utilisateur existe déjà
        console.warn({ doesUserExist });
        if (doesUserExist) {
            res.status(401).json({ message: 'Username already taken' }); // si l'utilisateur existe déjà, on renvoie une erreur
        } else {
            const accessToken = generateAccessToken({ username, role: 'user' }); // on génère un token
            const user = new User({
                username: req.body.username,
                password: req.body.password,
            });
            user.save(); // on sauvegarde l'utilisateur
            res.json({
                user,
                accessToken
            }); // on renvoie l'utilisateur et le token
        }
    }
}