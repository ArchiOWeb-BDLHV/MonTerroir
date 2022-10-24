import { Error } from "../../../error.js";
import { Role } from "../../models/role.js";
import { Policy } from "./Policy.js";

export class UserPolicy extends Policy {
    static index(request, response, next) {
        if (request.user.is(Role.ADMIN)) {
            next();
        } else {
            console.log(request.user.role);
            throw new Error("You are not authorized to access to this resource", 403);
        }
    }

    static store(request, response, next) {
        next();
    }

    static show(request, response, next) {
        if (request.user._id == request.params.id) {
            next();
        } else {
            throw new Error("You are not authorized to access to this resource", 403);
        }
    }

    static update(request, response, next) {
        next();
    }

    static destroy(request, response, next) {
        next();
    }
}