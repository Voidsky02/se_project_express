/* eslint-disable max-classes-per-file */

class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 400;
    }
}

class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 401;
    }
}

class ForbiddenError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 403;
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 404;
    }
}

class ConflictError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 409;
    }
}

function convertServerError(error) {
    if (error.name === "ValidationError" || error.name === "CastError") {
        return new BadRequestError('Bad Request');
    }
    if (error.name === "UnauthorizedError") {
        return new UnauthorizedError('Unauthorized Request');
    }
    if (error.name === "ForbiddenError") {
        return new ForbiddenError('Forbidden request');
    }
    if (error.name === "DocumentNotFoundError") {
        return new NotFoundError('Request Not Found');
    }
    if (error.code === 11000) { // does not have an error name
        return new ConflictError('Conflicting Request');
    }
    return error;
}

module.exports = {
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    ConflictError, 
    convertServerError,
};