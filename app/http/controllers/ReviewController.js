import Review from "../../models/review.js";

function index(req, res, next) {
    Review.find().exec(function(err, reviews) {
        if (err) {
            return next(err);
        }
        res.status(200).json(reviews);
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
    Review.findById(req.params.id).exec(function(err, reviews) {
        if (err) {
            return next(err);
        }
        res.status(200).json(reviews);
    });
}

function update(req, res, next) {
    Review.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function(err, review) {
        if (err) {
            return next(err);
        }
        res.status(201).json(review);
    });
}

function destroy(req, res, next) {
    Review.findOneAndDelete({ _id: req.params.id }, function(err, review) {
        if (err) {
            return next(err);
        }
        res.status(204).json();
    });
}


export { index, store, show, update, destroy };