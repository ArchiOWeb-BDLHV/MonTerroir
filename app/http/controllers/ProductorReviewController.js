import createDebugger from "debug";
import { broadcastMessage } from "../../../ws.js";
import Review from "../../models/review.js";
import Productor from "../../../models/productor.js";

const debug = createDebugger('express-api:reviews');

export class ProductorReviewController {
    
    static async index(req, res, next) {
        const productor = await Productor.findById(req.params.id); // populate('author') is used to get the author's name
        const review = productor.reviews;
        res.status(200).json(reviewsScore);
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