import createDebugger from "debug";
import { broadcastMessage } from "../../../ws.js";
import Review from "../../models/review.js";
import Productor from "../../models/productor.js";
import mongoose from "mongoose";

const debug = createDebugger('express-api:reviews');

export class ProductorReviewController {

    static async index(req, res, next) {
        const reviews = await Review.find().where('productor').equals(req.params.id)
            .populate("author", { 'username': 1 }) // populate('author') is used to get the author's datas
            .populate("productor", "username")

        const average = await Review.aggregate([
            { $match: { productor: mongoose.Types.ObjectId(req.params.id) } },
            { $group: { _id: req.params.id, average: { $avg: "$score" } } }
        ])

        res.status(200).json({ data: { reviews, average: average[0].average } });
    }

    static async store(req, res, next) {
        const review = new Review({
            score: req.body.score,
            message: req.body.message,
            author: req.user._id,
            productor: req.params.id
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