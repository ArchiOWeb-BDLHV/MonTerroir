import createDebugger from "debug";
import Review from "../../models/review.js";

const debug = createDebugger('express-api:reviews');

export class ProductReviewController {

    static async index(req, res, next) {
        const reviews = await Review.find().where('product').equals(req.params.id).populate('reviews');

        const average = await Review.getAverage('product', req.params.id);

        res.status(200).json({ data: { reviews, average: average } });
    }

    static async store(req, res, next) {
        const review = new Review({
            score: req.body.score,
            message: req.body.message,
            author: req.body.author
        });
        const result = await review.save();
        res.status(201).json(result);
    }

    static async show(req, res, next) {
        next("not implemented"); // si on va sur la fonction, ça met une erreur, c'est pas implémenté (on veut pas 1 review détaillée mais en liste)
        // const review = await Review.findById(req.params.id);
        // res.status(200).json(review);
    }

    static async update(req, res, next) {
        const review = await Review.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        res.status(200).json(review);
    }

    static async destroy(req, res, next) {
        const review = await Review.findOneAndDelete({ _id: req.params.id });
        res.status(204).json();
    }

}