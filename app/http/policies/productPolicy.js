import { Role } from "../../models/role.js";
import { unauthorized } from "../../../errors.js";

export class ProductPolicy {
    static index(request, response, next) {
        next();
    }

    static store(request, response, next) {
        if (
            request.user._id.equals(request.params.id) ||
            request.user.is(Role.PRODUCTOR) ||
            request.user.is(Role.ADMIN)
        ) {
            next();
        } else {
            unauthorized(next);
        }
    }

    static show(request, response, next) {
        next();
    }

    static update(request, response, next) {
        if (
            request.user._id.equals(request.params.id) ||
            request.user.is(Role.PRODUCTOR) ||
            request.user.is(Role.ADMIN)
        ) {
            next();
        } else {
            unauthorized(next);
        }
    }

    static destroy(request, response, next) {
        if (
            request.user._id.equals(request.params.id) ||
            request.user.is(Role.PRODUCTOR) ||
            request.user.is(Role.ADMIN)
        ) {
            next();
        } else {
            unauthorized(next);
        }
    }
}