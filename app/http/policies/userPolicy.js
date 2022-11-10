import { unauthorized } from "../../../errors.js";
import { Role } from "../../models/role.js";

export class UserPolicy {
    static index(request, response, next) {
        if (request.user.is(Role.ADMIN)) {
            next();
        } else {
            unauthorized(next);
        }
    }

    static store(request, response, next) {
        if (request.user.is(Role.ADMIN)) {
            next();
        } else {
            unauthorized(next);
        }
    }

    static show(request, response, next) {
        if (request.user._id.equals(request.params.id) || request.user.is(Role.ADMIN)) {
            next();
        } else {
            unauthorized(next);
        }
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