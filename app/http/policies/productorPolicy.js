import { unauthorized } from "../../../errors.js";
import { Role } from "../../models/role.js";

export class ProductorPolicy {
    static index(request, response, next) {
        next();
    }

    static store(request, response, next) {
        if (request.user.is(Role.ADMIN)) {
            next();
        } else {
            unauthorized(next);
        }
    }

    static show(request, response, next) {
        next();
    }

    static update(request, response, next) {
        if (request.user._id == request.params.id || request.user.is(Role.ADMIN)) {
            next();
        } else {
            unauthorized(next);
        }
    }

    static destroy(request, response, next) {
        if (request.user._id == request.params.id || request.user.is(Role.ADMIN)) {
            next();
        } else {
            unauthorized(next);
        }
    }
}