import createDebugger from "debug";
import Product from "../../models/product.js";
import Image from "../../models/image.js";
import { nonProcessable } from "../../../errors.js";
import fs from "fs";
import config from "../../../config.js";
import User from "../../models/user.js";

const debug = createDebugger("express-api:product");

export class ProductController {
    static async index(req, res, next) {
        let products;
        if (req.query.category) {
            //where products categories includes req.query.category with query
            products = await Product.find({ categories: req.query.category }).sort("name").populate(["images", "categories"])
        } else {
            products = await Product.find().sort("name").populate(["images", "categories"])
        }
        res.status(200).json(products);
    }

    static async store(req, res, next) {
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

                image.mv(url, (error) => {
                    if (error) {
                        return next(error);
                    }
                });

                const i = await Image.create({
                    url: config.appUrl + path,
                });
                images.push(i);
            }
        }
        try {
            const product = new Product({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                category: req.body.category,
                images: images,
            });

            const result = await product.save();

            //attach product to user 
            const user = req.user;
            user.products.push(result);
            await user.save();
            res.status(201).json(result);
        } catch (e) {
            if (e.name === "ValidationError") {
                nonProcessable(next, e);
            }
        }
    }

    static async show(req, res, next) {
        const product = await Product.findById(req.params.id).populate("images").populate("categories");
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    }

    static async update(req, res, next) {
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

                image.mv(url, (error) => {
                    if (error) {
                        return next(error);
                    }
                });

                const i = await Image.create({
                    url: config.appUrl + path,
                });
                images.push(i);
            }
        }

        const product = await Product.findOneAndUpdate({ _id: req.params.id }, {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            categories: [...req.body.categories],
            images: [...images],

        }, {
            new: true,
        });
        res.status(200).json(product);
    }

    static async destroy(req, res, next) {
        const product = await Product.findOneAndDelete({ _id: req.params.id });
        res.status(204).json();
    }

    static async mine(req, res, next) {
        const user = await User.findById(req.user._id).populate({
            path: "products",
            populate: {
                path: "images",
                model: "Image",
            },
        }).populate({
            path: "products",
            populate: {
                path: "categories",
                model: "Category",
            },
        });
        res.status(200).json(user.products);
    }
}