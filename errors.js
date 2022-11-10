export function unauthorized(next) {
    const error = new Error("You are not authorized to access to this resource");
    error.status = 403;
    next(error);
}

export function nonProcessable(next, error) {
    const e = new Error(error.message || "The request could not be processed");
    e.status = 422;
    next(e);
}