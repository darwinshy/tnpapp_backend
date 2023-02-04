class UserNotAuthorized extends Error {
    constructor(...params) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, UserNotAuthorized);
        }
        this.name = 'UserNotAuthorized';
    }
}

class TokenExpiredError extends Error {
    constructor(...params) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, TokenExpiredError);
        }
        this.name = 'TokenExpiredError';
    }
}

class NoTokenError extends Error {
    constructor(...params) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, NoTokenError);
        }
        this.name = 'NoTokenError';
    }
}

class ObjectNotFound extends Error {
    constructor(...params) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ObjectNotFound);
        }
        this.name = 'ObjectNotFound';
    }
}

class EmptyRequestBody extends Error {
    constructor(...params) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, EmptyRequestBody);
        }
        this.name = 'EmptyRequestBody';
    }
}

class MissingRequiredPayload extends Error {
    constructor(...params) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, MissingRequiredPayload);
        }
        this.name = 'MissingRequiredPayload';
    }
}

class InvalidRequestPayload extends Error {
    constructor(...params) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, InvalidRequestPayload);
        }
        this.name = 'InvalidRequestPayload';
    }
}

class MissingQueryParam extends Error {
    constructor(...params) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, MissingQueryParam);
        }
        this.name = 'MissingQueryParam';
    }
}

const error = {
    100: 'EmptyRequestBody',
    101: 'ObjectNotFound',
    201: 'GetMethodNotAllowed',
    202: 'PostMethodNotAllowed',
    203: 'PutMethodNotAllowed',
    204: 'DeleteMethodNotAllowed',
    205: 'PatchMethodNotAllowed',
};

module.exports = {
    UserNotAuthorized,
    TokenExpiredError,
    ObjectNotFound,
    EmptyRequestBody,
    MissingRequiredPayload,
    InvalidRequestPayload,
    MissingQueryParam,
    NoTokenError,
    error,
};
