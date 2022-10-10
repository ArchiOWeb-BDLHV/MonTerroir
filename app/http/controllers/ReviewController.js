import Review from "../../models/review.js";

async function index(req, res, next) {
    const reviewsScore = await Review.find().sort('score');
    res.status(200).json(reviewsScore);
    const reviewsMsg = await Review.find().sort('message');
    res.status(200).json(reviewsMsg);

    //// Ancienne version, sans safeRoute et sans async/await
    // Review.find().exec(function(err, reviews) {
    //     if (err) {
    //         return next(err);
    //     }
    //     res.status(200).json(reviews);
    // });
}

async function store(req, res, next) {
    const review = new Review({
        score: req.body.score,
        message: req.body.message
    });
    const result = await review.save();
    res.status(201).json(result);

    //// Ancienne version, sans safeRoute et sans async/await
    // review.save(function(err) {
    //     if (err) {
    //         return next(err);
    //     }
    //     res.status(201).send(review);
    // });
}

async function show(req, res, next) {
    const review = await Review.findById(req.params.id);
    res.status(200).json(review);

    //// Ancienne version, sans safeRoute et sans async/await
    // Review.findById(req.params.id).exec(function(err, reviews) {
    //     if (err) {
    //         return next(err);
    //     }
    //     res.status(200).json(reviews);
    // });
}

async function update(req, res, next) {
    const review = await Review.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    res.status(200).json(review);

    //// Ancienne version, sans safeRoute et sans async/await
    // Review.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function(err, review) {
    //     if (err) {
    //         return next(err);
    //     }
    //     res.status(201).json(review);
    // });
}

async function destroy(req, res, next) {
    const review = await Review.findOneAndDelete({ _id: req.params.id });
    res.status(204).json();

    //// Ancienne version, sans safeRoute et sans async/await
    // Review.findOneAndDelete({ _id: req.params.id }, function(err, review) {
    //     if (err) {
    //         return next(err);
    //     }
    //     res.status(204).json();
    // });
}

export { index, store, show, update, destroy };