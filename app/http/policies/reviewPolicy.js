import { Role } from "../../models/role.js";

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
        next();
    }

    static destroy(request, response, next) {
        next();
    }
}