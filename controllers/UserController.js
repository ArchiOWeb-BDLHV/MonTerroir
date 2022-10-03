import User from "../models/user.js";

function index(req, res, next) {
    User.find().sort('name').exec(function(err, users) {
        if (err) {
            return next(err);
        }
        res.send(users);
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
        res.send(users);
    });
}

function update(req, res, next) {
    User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function(err, user) {
        if (err) {
            return next(err);
        }
        res.json(user);
    });
}


function destroy(req, res, next) {
    res.send("Got a response from the users route");
}


export { index, store, show, update, destroy };