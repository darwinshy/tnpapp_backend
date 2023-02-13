const { InvalidQueryParam, EmptyRequestBody } = require('./errors');

// Check if the filters provided by the user are valid or not
// and remove null values from the request body object
exports.verifyJobFilters = (req, res, next) => {
    const validFilters = ['companyID', 'year', 'type', 'ctc'];

    const filters = Object.keys(req.body);

    if (filters.length === 0) {
        const err = new EmptyRequestBody('No filters provided');
        err.status = 400;
        return next(err);
    }

    const filterValidator = (key) => {
        if (!validFilters.includes(key)) {
            const err = new InvalidQueryParam(`Invalid filter: ${key}. Valid filters are: ${validFilters}`);
            err.status = 400;
            return next(err);
        }
    };

    Object.keys(filters).forEach(filterValidator);

    next();
};

// Check if the job type provided by the user is valid or not
exports.verifyJobType = (req, res, next) => {
    if (!req.body.type) {
        next();
    }

    const validTypes = ['INTERNSHIP', 'FTE', 'INTERNSHIP+FTE'];

    if (!validTypes.includes(req.body.type)) {
        const err = new InvalidQueryParam(`Invalid type: ${req.body.type}. Valid types are: ${validTypes}`);
        err.status = 400;
        return next(err);
    }

    next();
};
