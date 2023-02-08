const { models } = require('../sequilize');

const {
    MissingQueryParam,
    ActionDenied,
    EmptyRecords,
    InvalidQueryParam,
} = require('../utils/errors');

// _____________________________________________________________________________
// Controller functions

//
exports.getCompanyByID = async (req, res, next) => {
    try {
        const companyID = req.params.companyID;

        if (typeof companyID !== 'number') {
            const err = new InvalidQueryParam(
                'companyID should be of type number'
            );
            err.status = 400;
            return next(err);
        }

        if (!companyID) {
            const err = new MissingQueryParam(
                'companyID is missing in the query params'
            );
            err.status = 400;
            return next(err);
        }

        let company = await models.company.findByPk(companyID);

        if (!company) {
            const err = new EmptyRecords('No company found');
            err.status = 404;
            return next(err);
        }

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ ok: true, company: company });
    } catch (error) {
        next(error);
    }
};

// Students and Coordinators can only access jobs for their grad year
exports.getAllCompanies = async (req, res, next) => {
    try {
        const companies = await models.company.findAll({});

        if (!companies || companies.length === 0) {
            const err = new EmptyRecords('No companies found');
            err.status = 404;
            return next(err);
        }

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ ok: true, companies: companies });
    } catch (error) {
        next(error);
    }
};

// Add a new job
exports.addNewCompany = async (req, res, next) => {
    try {
        const { companyName } = req.body;

        const doesCompanyEx = await models.company.findOne({
            where: { companyName: companyName },
        });

        if (doesCompanyEx) {
            const err = new ActionDenied(
                `A company with the name ${companyName} already exists`
            );
            err.status = 400;
            return next(err);
        }

        let company = {
            ...req.body,
            updatedBy: req.user.authID,
        };

        company = await models.company.create(company);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ ok: true, company: company });
    } catch (error) {
        next(error);
    }
};

// Update a job
exports.updateCompany = async (req, res, next) => {
    try {
        const companyID = req.params.companyID;

        if (!companyID) {
            const err = new MissingQueryParam(
                'companyID is missing in the query params'
            );
            err.status = 400;
            return next(err);
        }

        const company = await models.company.findByPk(companyID);

        if (!company) {
            const err = new EmptyRecords(
                `No company found with ID ${companyID}`
            );
            err.status = 404;
            return next(err);
        }

        req.body.updatedBy = req.user.userID;

        await company.update(req.body);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ ok: true, company: company });
    } catch (error) {
        next(error);
    }
};
