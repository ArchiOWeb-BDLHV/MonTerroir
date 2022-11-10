import createDebugger from "debug";
import Product from "../../models/product.js";

const debug = createDebugger("express-api:product");

export class ProductController {
  static async index(req, res, next) {
    const products = await User.find().sort("name");
    res.status(200).json(products);
  }

  static async store(req, res, next) {
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image_url: req.body.image_url,
    });
    const result = await product.save();
    res.status(201).json(result);
  }

  static async show(req, res, next) {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  }

  static async update(req, res, next) {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
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
