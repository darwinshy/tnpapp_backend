const { MissingQueryParam, InvalidQueryParam } = require('./errors');

exports.parseIntPathParam = (req, res, next) => {
    try {
        if (!req.params) {
            const err = new MissingQueryParam(`No params found`);
            err.status = 400;
            return next(err);
        }

        const param = Object.keys(req.params)[0];
        const query = req.params[param];

        if (!query) {
            const err = new MissingQueryParam(`${query} is missing in the query params`);
            err.status = 400;
            return next(err);
        }

        if (isNaN(query)) {
            const err = new InvalidQueryParam(`${param} is not a number`);
            err.status = 400;
            return next(err);
        }

        req.params[param] = parseInt(query);
        next();
    } catch (error) {
        return next(error);
    }
};

exports.parseStringPathParam = (req, res, next) => {
    try {
        if (!req.params) {
            const err = new MissingQueryParam(`No params found`);
            err.status = 400;
            return next(err);
        }

        const param = Object.keys(req.params)[0];
        const query = req.params[param];

        if (!query) {
            const err = new MissingQueryParam(`${query} is missing in the query params`);
            err.status = 400;
            return next(err);
        }

        if (typeof query !== 'string') {
            const err = new InvalidQueryParam(`${param} is not a string`);
            err.status = 400;
            return next(err);
        }

        next();
    } catch (error) {
        return next(error);
    }
};
