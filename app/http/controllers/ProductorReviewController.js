import createDebugger from "debug";
import { broadcastMessage } from "../../../ws.js";
import Review from "../../models/review.js";
import Productor from "../../models/productor.js";
import mongoose from "mongoose";
import { nonProcessable } from "../../../errors.js";

const debug = createDebugger('express-api:reviews');

export class ProductorReviewController {

    static async index(req, res, next) {
        const reviews = await Review.find().where('productor').equals(req.params.id)
            .populate("author", { 'username': 1 }) // populate('author') is used to get the author's datas
            .populate("productor", "username")

        const average = await Review.getAverage('productor', req.params.id);

        res.status(200).json({ data: { reviews, average: average } });
    }

    static async store(req, res, next) {
        const review = new Review({
            score: req.body.score,
            message: req.body.message,
            author: req.user._id,
        });




        try {
            const result = await review.save();
            //attach the review to the productor
            const productor = await Productor.findById(req.params.id);
            productor.reviews.push(review._id);
            await productor.save();

            res.status(201).json(result);
        } catch (e) {
            if (e.name === 'ValidationError') {
                nonProcessable(next, e);
            }
        }
    }

    static async show(req, res, next) {
        next("not implemented"); // si on va sur la fonction, ça met une erreur, c'est pas implémenté (on veut pas 1 review détaillée mais en liste)
        // const review = await Review.findById(req.params.id);
        // res.status(200).json(review);
    }

    static async update(req, res, next) {
        const review = await Review.findOneAndUpdate({ _id: req.params.reviewId }, req.body, { new: true });
        res.status(200).json(review);
    }

    static async destroy(req, res, next) {
        const review = await Review.findOneAndDelete({ _id: req.params.reviewId });
        res.status(204).json();
    }

}