import { Role } from "../../models/role.js";
import { unauthorized } from "../../../errors.js";

export class MessagePolicy {
    static index(request, response, next) {
        if (request.user.conversations.includes(request.params.convId)) {
            next();
        } else {
            unauthorized(next);

        }
    }

    static store(request, response, next) {
        if (request.user.conversations.includes(request.params.convId)) {
            next();
        } else {
            unauthorized(next);

        }
    }

    static show(request, response, next) {
        if (request.user.conversations.includes(request.params.convId)) {
            next();
        } else {
            unauthorized(next);

        }
    }

    static update(request, response, next) {
        if (request.user.conversations.includes(request.params.convId)) {
            next();
        } else {
            unauthorized(next);
        }
    }

    static destroy(request, response, next) {
        if (request.user.conversations.includes(request.params.convId)) {
            next();
        } else {
            unauthorized(next);
        }
    }
}