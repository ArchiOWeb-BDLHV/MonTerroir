import User from "../../models/user.js";

async function index(req, res, next) {
    const users = await User.find().sort('name');
    res.status(200).json(users);
}

async function store(req, res, next) {
    const user = new User({
        name: req.body.name
    });
    const result = await user.save();
    res.status(201).json(result);
}

async function show(req, res, next) {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
}

async function update(req, res, next) {
    const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    res.status(200).json(user);
}


async function destroy(req, res, next) {
    const user = await User.findOneAndDelete({ _id: req.params.id });
    res.status(204).json();
}


export { index, store, show, update, destroy };