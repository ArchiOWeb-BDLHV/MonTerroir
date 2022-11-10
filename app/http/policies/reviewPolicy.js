import { nonProcessable } from "../../../errors.js";

export class ReviewPolicy {

    static index(request, response, next) {
        next();
    }

    static store(request, response, next) {
        next();
    }

    static show(request, response, next) {
        next();
    }

    static update(request, response, next) {
        if (!request.body.author == (request.user._id)) {
            nonProcessable(next);
        } else {
            next();
        }
    }

    static destroy(request, response, next) {
        next();
    }
}