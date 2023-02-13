const { models } = require('../sequilize');

const { ActionDenied, EmptyRecords } = require('../utils/errors');

// _____________________________________________________________________________
// Controller functions

// Students and Coordinators can only access a job if the job year matches their
// graduation year
exports.getJobByID = async (req, res, next) => {
    try {
        const jobID = req.params.jobID;
        const job = await models.job.findByPk(jobID);

        if (!job) {
            const err = new EmptyRecords(`No job found with ID ${jobID}`);
            err.status = 404;
            return next(err);
        }

        if (req.user.accessLevel !== 'ADMIN' && job.year !== req.user.gradYear) {
            const err = new ActionDenied('Your graduation year does not match the job year. You cannot view this job.');
            err.status = 403;
            return next(err);
        }

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        json({ ok: true, job: job });
    } catch (error) {
        next(error);
    }
};

// Students and Coordinators can only access jobs for their grad year
exports.getAllJobs = async (req, res, next) => {
    try {
        let jobs;

        if (req.user.accessLevel === 'ADMIN') {
            jobs = await models.job.findAll();
        }

        if (req.user.accessLevel === 'COORDINATOR' || req.user.accessLevel === 'STUDENT') {
            jobs = await models.job.findAll({
                where: { year: req.user.gradYear },
            });
        }

        if (!jobs || jobs.length === 0) {
            const err = new EmptyRecords('No jobs found');
            err.status = 404;
            return next(err);
        }

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ ok: true, jobs: jobs });
    } catch (error) {
        next(error);
    }
};

// In this, we check if the companyID is valid and if the job year
// matches the user's graduation year.This is to prevent coordinators from
// creating jobs for other years. Then, we check if the company exists. If it
// does, we create the job and add it to the company's openings (relation).
exports.addNewJob = async (req, res, next) => {
    try {
        if (req.user.accessLevel !== 'ADMIN' && req.user.gradYear !== req.body.year) {
            const err = new ActionDenied(
                'Your graduation year does not match the job year. You cannot create this job.'
            );
            err.status = 403;
            return next(err);
        }

        const companyID = req.params.companyID;
        const company = await models.company.findByPk(companyID);

        if (!company) {
            const err = new EmptyRecords(`No company found with ID ${companyID}`);
            err.status = 404;
            return next(err);
        }

        req.body.createdBy = req.user.authID;
        req.body.updatedBy = req.user.authID;

        const job = await models.job.create(req.body);
        const opening = await company.addJob(newJob, {
            through: { year: req.body.year },
        });

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ ok: true, job: job, opening: opening });
    } catch (error) {
        next(error);
    }
};

// Update a job
exports.updateJob = async (req, res, next) => {
    try {
        const jobID = req.params.jobID;
        const job = await models.job.findByPk(jobID);

        if (!job) {
            const err = new EmptyRecords(`No job found with ID ${jobID}`);
            err.status = 404;
            return next(err);
        }

        if (req.user.accessLevel !== 'ADMIN' && job.year !== req.user.gradYear) {
            const err = new ActionDenied(
                'Your graduation year does not match the job year. You cannot update this job.'
            );
            err.status = 403;
            return next(err);
        }

        req.body.updatedBy = req.user.authID;

        await job.update(req.body);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ ok: true, message: 'Job update successful.', job: job });
    } catch (error) {
        next(error);
    }
};

exports.getJobsByCompany = async (req, res, next) => {
    try {
        const companyID = req.params.companyID;
        let jobs;

        if (req.user.accessLevel === 'ADMIN') {
            jobs = await models.job.findAll({ where: { companyID } });
        } else {
            const queryIncludes = [
                {
                    model: models.company,
                    where: { companyID },
                    through: { where: { year: req.user.gradYear } },
                },
            ];

            jobs = await models.job.findAll({ include: queryIncludes });
        }

        if (!jobs || jobs.length === 0) {
            const err = new EmptyRecords('No jobs found');
            err.status = 404;
            return next(err);
        }

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ ok: true, jobs: jobs });
    } catch (error) {
        next(error);
    }
};

exports.getFilteredJobs = async (req, res, next) => {
    try {
        const { companyID, year, type, ctc } = req.body;

        // If the user is not an admin, they can only view jobs for their graduating year
        if (req.user.accessLevel !== 'ADMIN' && year && year !== req.user.gradYear) {
            const err = new UserNotAuthorized('You can only view jobs for your graduating year');
            err.status = 400;
            return next(err);
        }

        let query = {};

        if (year) {
            query.push({ year });
        }

        if (type) {
            query.push({ type });
        }

        if (ctc) {
            query.push({ ctc });
        }

        let jobs;

        if (companyID) {
            jobs = await models.job.findAll({
                where: { query },
                include: { model: models.company, where: { companyID } },
            });
        } else {
            jobs = await models.job.findAll({ where: { query } });
        }

        if (!jobs || jobs.length === 0) {
            const err = new EmptyRecords('No jobs found');
            err.status = 404;
            return next(err);
        }

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ ok: true, jobs: jobs });
    } catch (error) {
        next(error);
    }
};
