import Jwt from "jsonwebtoken";
import config from "../../../config.js";
import User from "../../models/user.js";
import Client from "../../models/client.js";
import Productor from "../../models/productor.js";
import { nonProcessable } from "../../../errors.js";
import fs from "fs";
import Image from "../../models/image.js";


export function generateAccessToken(user) {
    return Jwt.sign({ id: user._id }, config.jwt.secret, { expiresIn: config.jwt.expiresIn }); // Generation du token d'authentification
}

export async function login(req, res) {
    const { username, password } = req.body; // on récupère le username et le password dans le body de la requête

    if (!(username && password)) {
        return res.status(422).json({ error: 'Username and password are required' }); // si le username ou le password est manquant, on renvoie une erreur
    } else {
        const user = await User.findOneByUsername(username).populate({
            path: 'products',
            populate: {
                path: 'images',
                model: 'Image'
            }
        }); // on récupère l'utilisateur correspondant au username
        if (!user) {
            return res.status(401).json({ error: 'Username or password incorrect' }); // si l'utilisateur n'existe pas, on renvoie une erreur
        }

        user.comparePassword(password, (err, isMatch) => {
            if (!isMatch || err) {
                return res.status(401).json({ error: 'Username or password incorrect' }); // si le mot de passe est incorrect, on renvoie une erreur
            } else {
                const accessToken = generateAccessToken(user.toJSON()); // on génère un token
                return res.json({ user, accessToken }); // on renvoie l'utilisateur et le token
            }
        });
    }
}

export async function register(req, res, next) {

    const { username, password } = req.body; // on récupère le username et le password dans le body de la requête

    if (!(username && password)) {
        res.status(422).json({ message: 'Username and password are required' }); // si le username ou le password est manquant, on renvoie une erreur
    } else {
        const doesUserExist = await User.findOneByUsername(username).populate({
            path: 'products',
            populate: {
                path: 'images',
                model: 'Image'
            }
        }); // on vérifie si l'utilisateur existe déjà


        if (doesUserExist != null) {
            res.status(400).json({ message: 'Username already taken' }); // si l'utilisateur existe déjà, on renvoie une erreur
        } else {
            try {
                let user;

                let images = [];
                if (req.files) {
                    for (const image of req.files.images) {
                        // deplacer image sur serveur
                        const path = "/uploads/" + Date.now() + "_" + image.name;
                        const url = process.cwd() + "/public" + path;

                        //create folder if not exist
                        if (!fs.existsSync(process.cwd() + "/public/uploads")) {
                            fs.mkdirSync(process.cwd() + "/public/uploads", { recursive: true });
                        }

                        let buff = Buffer.from(data, 'base64');
                        fs.writeFileSync(url, buff);

                        const i = await Image.create({
                            url: path,
                        });
                        images.push(i);
                    }
                }

                if (req.body.role == "productor") {
                    user = new Productor({
                        username: username,
                        password: password,
                        role: 2,
                        location: req.body.location,
                        images: images,
                    });
                } else {
                    user = new Client({
                        username: req.body.username,
                        password: req.body.password,
                        location: req.body.location,
                        images: images,
                    });
                }

                await user.save(); // on sauvegarde l'utilisateur

                const accessToken = generateAccessToken(user.toJSON()); // on génère un token
                res.json({
                    user,
                    accessToken
                }); // on renvoie l'utilisateur et le token
            } catch (err) {
                nonProcessable(next, err);
            }
        }
    }
}

export async function me(req, res, next) {
    const user = await User.findById(req.user.id).populate({
        path: 'products',
        populate: {
            path: 'images',
            model: 'Image'
        }
    });
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    const accessToken = generateAccessToken(user.toJSON()); // on génère un token

    return res.json({ user, accessToken });
}