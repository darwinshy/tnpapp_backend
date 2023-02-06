// Check if the filters provided by the user are valid or not

const { UserNotAuthorized } = require('./errors');

// and remove null values from the request body object
exports.verifyJobFilters = (req, res, next) => {
    const validFilters = ['companyID', 'year', 'type', 'ctc'];

    const filters = Object.keys(req.body);

    if (filters.length === 0) {
        const err = new EmptyRequestBody('No filters provided');
        err.status = 400;
        return next(err);
    }

    Object.keys(filters).forEach((key) => {
        if (!validFilters.includes(key)) {
            const err = new InvalidQueryParam(
                `Invalid filter: ${key}. Valid filters are: ${validFilters}`
            );
            err.status = 400;
            return next(err);
        }
    });

    let nonNullFilters;

    Object.keys(req.body).forEach((key) => {
        if (req.body[key]) {
            nonNullFilters = { ...nonNullFilters, [key]: req.body[key] };
        }
    });

    if (
        nonNullFilters.year &&
        req.user.accessLevel !== 'ADMIN' &&
        nonNullFilters.year !== req.user.gradYear
    ) {
        const err = new UserNotAuthorized(
            'You can only view jobs for your graduating year'
        );
        err.status = 400;
        return next(err);
    }

    req.body = nonNullFilters;

    next();
};

exports.verifyJobType = (req, res, next) => {
    if (!req.body.type) {
        next();
    }

    const validTypes = ['INTERNSHIP', 'FTE', 'INTERNSHIP+FTE'];

    if (req.body.type && !validTypes.includes(req.body.type)) {
        const err = new InvalidQueryParam(
            `Invalid type: ${req.body.type}. Valid types are: ${validTypes}`
        );
        err.status = 400;
        return next(err);
    }

    next();
};
