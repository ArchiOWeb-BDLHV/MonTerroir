import { Role } from "../../models/role.js";

export class ReviewPolicy {

    static index(request, response, next) {
        if (true) { // À changer
            next();
        } else {
            const error = new Error("You are not authorized to access to this resource");
            error.status = 403;
            next(error);
        }
    }

    static store(request, response, next) {
        next();
    }

    static show(request, response, next) {
        if (true) { // À changer
            next();
        } else {
            const error = new Error("You are not authorized to access to this resource");
            error.status = 403;
            next(error);
        }
    }

    static update(request, response, next) {
        next();
    }

    static destroy(request, response, next) {
        next();
    }
}