import Review from "../models/review.js";

function index(req, res, next) {
    Review.find().exec(function(err, reviews) {
        if (err) {
            return next(err);
        }
        res.send(reviews);
    });
}

function store(req, res, next) {
    const review = new Review({
        score: req.body.score,
        message: req.body.message
    });
    review.save(function(err) {
        if (err) {
            return next(err);
        }
        res.status(201).send(review);
    });
}

function show(req, res, next) {
    res.send("Got a response from the reviews route");
}

function update(req, res, next) {
    res.send("Got a response from the reviews route");
}

function destroy(req, res, next) {
    res.send("Got a response from the reviews route");
}


export { index, store, show, update, destroy };