import { Role } from "../../models/role.js";

export class MessagePolicy {
    static index(request, response, next) {
        if (request.user.conversations.includes(request.params.convId)) {
            next();
        } else {
            const error = new Error("You are not authorized to access to this resource");
            error.status = 403;
            next(error);
        }
    }

    static store(request, response, next) {
        if (request.user.conversations.includes(request.params.convId)) {
            next();
        } else {
            const error = new Error("You are not authorized to access to this resource");
            error.status = 403;
            next(error);
        }
    }

    static show(request, response, next) {
        if (request.user.conversations.includes(request.params.convId)) {
            next();
        } else {
            const error = new Error("You are not authorized to access to this resource");
            error.status = 403;
            next(error);
        }
    }

    static update(request, response, next) {
        next("Not implemented");
    }

    static destroy(request, response, next) {
        next("Not implemented");
    }
}