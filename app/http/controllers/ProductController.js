import createDebugger from "debug";
import Product from "../../models/product.js";
import Image from "../../models/image.js";
import { nonProcessable } from "../../../errors.js";
import fs from "fs";
import config from "../../../config.js";
import User from "../../models/user.js";
import Category from "../../models/category.js";
import { randomUUID } from "crypto";
import Productor from "../../models/productor.js";

const debug = createDebugger("express-api:product");

export class ProductController {
  static async index(req, res, next) {
    let products;
    if (req.query.category) {
      //where products categories includes req.query.category with query
      products = await Product.find({ categories: req.query.category })
        .sort("name")
        .populate(["images", "categories"]);
    } else if (req.query.search) {
      products = await Product.find({ title: req.query.search })
        .sort("name")
        .populate(["images", "categories"]);
    } else {
      products = await Product.find()
        .sort("name")
        .populate(["images", "categories"]);
    }

    //find productor who has this product
    for (const product of products) {
      const user = await Productor.findOne({ products: product._id });
      product.productor = user;
    }
    res.status(200).json(products);
  }

  static async store(req, res, next) {
    let images = [];
    if (req.body.images) {
      for (const image of req.body.images) {
        // deplacer image sur serveur
        const path =
          "/uploads/" +
          Date.now() +
          "_" +
          Math.floor(Math.random() * 100000) +
          ".png";
        const url = process.cwd() + "/public" + path;

        //create folder if not exist
        if (!fs.existsSync(process.cwd() + "/public/uploads")) {
          fs.mkdirSync(process.cwd() + "/public/uploads", { recursive: true });
        }

        let base64Image = image.split(";base64,").pop();
        fs.writeFileSync("image.png", base64Image, { encoding: "base64" });
        fs.renameSync(process.cwd() + "/image.png", url);

        const i = await Image.create({
          url: config.appUrl + path,
        });
        images.push(i);
      }
    }
    try {
      const categories = await Category.find({
        _id: { $in: req.body.categories },
      });

      const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        categories: categories,
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
    const product = await Product.findById(req.params.id)
      .populate("images")
      .populate("categories");

    const user = await Productor.findOne({ products: product._id });
    product.productor = user;
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  }

  static async update(req, res, next) {
    let product = await Product.findById(req.params.id);
    let images = product.images;
    if (req.body.images) {
      images = [];
      for (const image of req.body.images) {
        // deplacer image sur serveur
        const path =
          "/uploads/" +
          Date.now() +
          "_" +
          Math.floor(Math.random() * 100000) +
          ".png";
        const url = process.cwd() + "/public" + path;

        //create folder if not exist
        if (!fs.existsSync(process.cwd() + "/public/uploads")) {
          fs.mkdirSync(process.cwd() + "/public/uploads", { recursive: true });
        }

        let base64Image = image.split(";base64,").pop();
        fs.writeFileSync("image.png", base64Image, { encoding: "base64" });
        fs.renameSync(process.cwd() + "/image.png", url);

        const i = await Image.create({
          url: config.appUrl + path,
        });
        images.push(i);
      }
    }

    //update product
    product.name = req.body.name;
    product.description = req.body.description;
    product.price = req.body.price;
    product.images = images;
    product.categories = req.body.categories;
    product = await product.save();

    res.status(200).json(product);
  }

  static async destroy(req, res, next) {
    const product = await Product.findOneAndDelete({ _id: req.params.id });
    res.status(204).json();
  }

  static async mine(req, res, next) {
    const user = await User.findById(req.user._id)
      .populate({
        path: "products",
        populate: {
          path: "images",
          model: "Image",
        },
      })
      .populate({
        path: "products",
        populate: {
          path: "categories",
          model: "Category",
        },
      });
    res.status(200).json(user.products);
  }
}
