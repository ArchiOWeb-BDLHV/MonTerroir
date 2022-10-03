import Product from "../models/product.js";

function index(req, res, next) {
    Product.find()
        .sort("name")
        .exec(function(err, products) {
            if (err) {
                return next(err);
            }
            res.send(products);
        });
}

function store(req, res, next) {
    const Product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image_url: req.body.image_url,
    });
    Product.save(function(err) {
        if (err) {
            return next(err);
        }
        res.status(201).send(Product);
    });
}

function show(req, res, next) {
    res.send("Got a response from the product route");
}

function update(req, res, next) {
    res.send("Got a response from the product route");
}

function destroy(req, res, next) {
    res.send("Got a response from the product route");
}

export { index, store, show, update, destroy };