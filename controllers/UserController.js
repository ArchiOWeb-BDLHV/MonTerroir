import User from "../models/user.js";

function index(req, res, next) {
    User.find().sort('name').exec(function(err, users) {
        if (err) {
            return next(err);
        }
        res.status(200).json(users);
    });
}

function store(req, res, next) {
    const user = new User({
        name: req.body.name
    });
    user.save(function(err) {
        if (err) {
            return next(err);
        }
        res.status(201).send(user);
    });
}

function show(req, res, next) {
    User.findById(req.params.id).exec(function(err, users) {
        if (err) {
            return next(err);
        }
        res.status(200).json(users);
    });
}

function update(req, res, next) {
    User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function(err, user) {
        if (err) {
            return next(err);
        }
        res.status(201).json(user);
    });
}


function destroy(req, res, next) {
    User.findOneAndDelete({ _id: req.params.id }, function(err, user) {
        if (err) {
            return next(err);
        }
        res.status(204).json();
    });
}


export { index, store, show, update, destroy };