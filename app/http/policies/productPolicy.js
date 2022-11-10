import { Role } from "../../models/role.js";

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
      const error = new Error(
        "You are not authorized to access to this resource"
      );
      error.status = 403;
      next(error);
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
      const error = new Error(
        "You are not authorized to access to this resource"
      );
      error.status = 403;
      next(error);
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
      const error = new Error(
        "You are not authorized to access to this resource"
      );
      error.status = 403;
      next(error);
    }
  }
}
