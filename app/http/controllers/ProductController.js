import createDebugger from "debug";
import Product from "../../models/product.js";
import Image from "../../models/image.js";
import { nonProcessable } from "../../../errors.js";
import fs from "fs";

const debug = createDebugger("express-api:product");

export class ProductController {
    static async index(req, res, next) {
        const products = await Product.find().sort("name").populate("images");
        res.status(200).json(products);
    }

    static async store(req, res, next) {

        let images = [];
        if (req.images) {
            for (const image of req.images) {
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
        try {
            const product = new Product({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                category: req.body.category,
                images: images,
            });

            const result = await product.save();
            res.status(201).json(result);
        } catch (e) {
            if (e.name === "ValidationError") {
                nonProcessable(next, e);
            }
        }
    }

    static async show(req, res, next) {
        const product = await Product.findById(req.params.id).populate("images");
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    }

    static async update(req, res, next) {
        const product = await Product.findOneAndUpdate({ _id: req.params.id },
            req.body, {
                new: true,
            }
        );
        res.status(200).json(product);
    }

    static async destroy(req, res, next) {
        const product = await Product.findOneAndDelete({ _id: req.params.id });
        res.status(204).json();
    }
}

// export { index, store, show, update, destroy };