const Company = require('../models/company');

const {
    MissingQueryParam,
    ActionDenied,
    EmptyRecords,
} = require('../utils/errors');

// _____________________________________________________________________________
// Controller functions

//
exports.getCompanyByID = async (req, res, next) => {
    try {
        const companyID = req.params.companyID;

        if (!companyID) {
            const err = new MissingQueryParam(
                'companyID is missing in the query params'
            );
            err.status = 400;
            return next(err);
        }

        let company = await Company.findByPk(company);

        if (!company) {
            const err = new EmptyRecords('No company found');
            err.status = 404;
            return next(err);
        }

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        json({ ok: true, company: company });
    } catch (error) {
        next(error);
    }
};

// Students and Coordinators can only access jobs for their grad year
exports.getAllCompanies = async (req, res, next) => {
    try {
        let companies;

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
        if (req.user.gradYear !== req.body.year) {
            const err = new ActionDenied(
                'Your graduation year does not match the company year. You cannot create company with this year.'
            );
            err.status = 403;
            return next(err);
        }

        const company = await Company.create({ ...req.body });

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

        const company = await Company.findByPk(companyID);

        if (!company) {
            const err = new EmptyRecords(
                `No company found with ID ${companyID}`
            );
            err.status = 404;
            return next(err);
        }

        await job.update(req.body);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ ok: true, job: job });
    } catch (error) {
        next(error);
    }
};
