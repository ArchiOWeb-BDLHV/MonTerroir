import Category from "../../models/category.js";

async function index(req, res, next) {
    const categories = await Category.find().sort("name");
    res.status(200).json(categories);
}

async function store(req, res, next) {
    const category = new Category({
        name: req.body.name,
    });
    const result = await category.save();
    res.status(201).json(result);
}

async function show(req, res, next) {
    const category = await Category.findById(req.params.id);
    res.status(200).json(category);
}

async function update(req, res, next) {
    const category = await Category.findOneAndUpdate({ _id: req.params.id },
        req.body, {
            new: true,
        }
    );
    res.status(200).json(category);
}

async function destroy(req, res, next) {
    const category = await Category.findOneAndDelete({ _id: req.params.id });
    res.status(204).json();
}

export { index, store, show, update, destroy };