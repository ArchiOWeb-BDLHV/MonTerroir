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
    res.send("Got a response from the users route");
}

function update(req, res, next) {
    res.send("Got a response from the users route");
}

function destroy(req, res, next) {
    res.send("Got a response from the users route");
}


export { index, store, show, update, destroy };