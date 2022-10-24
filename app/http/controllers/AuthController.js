import config from "../../../config.js";
import User from "../../models/user.js";
import Jwt from "jsonwebtoken";

function generateAccessToken(user) {
    return Jwt.sign({ username: user.username }, config.jwt.secret, { expiresIn: config.jwt.expiresIn }); // Generation du token d'authentification
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
                const accessToken = generateAccessToken(user.toJSON()); // on génère un token
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
            const user = new User({
                username: req.body.username,
                password: req.body.password,
            });
            user.save(); // on sauvegarde l'utilisateur

            const accessToken = generateAccessToken(user.toJSON()); // on génère un token
            res.json({
                user,
                accessToken
            }); // on renvoie l'utilisateur et le token
        }
    }
}