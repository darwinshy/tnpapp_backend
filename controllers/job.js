const { models } = require('../sequilize');

const {
    MissingQueryParam,
    ActionDenied,
    EmptyRecords,
} = require('../utils/errors');

// _____________________________________________________________________________
// Controller functions

// Students and Coordinators can only access a job if the job year matches their
// graduation year
exports.getJobByID = async (req, res, next) => {
    try {
        const jobID = req.params.jobID;

        if (!jobID) {
            const err = new MissingQueryParam(
                'jobID is missing in the query params'
            );
            err.status = 400;
            return next(err);
        }

        let job = await models.job.findByPk(jobID);

        if (!job) {
            const err = new EmptyRecords(`No job found with ID ${jobID}`);
            err.status = 404;
            return next(err);
        }

        if (job.year !== req.user.gradYear) {
            const err = new ActionDenied(
                'Your graduation year does not match the job year. You cannot view this job.'
            );
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

        if (
            req.user.accessLevel === 'COORDINATOR' ||
            req.user.accessLevel === 'STUDENT'
        ) {
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

// Add a new job
exports.addNewJob = async (req, res, next) => {
    try {
        const companyID = req.params.companyID;

        if (!companyID) {
            const err = new MissingQueryParam(
                'companyID is missing in the query params'
            );
            err.status = 400;
            return next(err);
        }

        if (req.user.gradYear !== req.body.year) {
            const err = new ActionDenied(
                'Your graduation year does not match the job year. You cannot create this job.'
            );
            err.status = 403;
            return next(err);
        }

        const job = await models.job.create({ ...req.body });

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ ok: true, job: job });
    } catch (error) {
        next(error);
    }
};

// Update a job
exports.updateJob = async (req, res, next) => {
    try {
        const jobID = req.params.jobID;

        if (!jobID) {
            const err = new MissingQueryParam(
                'jobID is missing in the query params'
            );
            err.status = 400;
            return next(err);
        }

        const job = await models.job.findByPk(jobID);

        if (!job) {
            const err = new EmptyRecords('No jobs found');
            err.status = 404;
            return next(err);
        }

        if (job.year !== req.user.gradYear) {
            const err = new ActionDenied(
                'Your graduation year does not match the job year. You cannot update this job.'
            );
            err.status = 403;
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

// Students and Coordinators can only access jobs for their grad year
exports.getJobsByCompany = async (req, res, next) => {
    try {
        const companyID = req.params.companyID;

        if (!companyID) {
            const err = new MissingQueryParam(
                'companyID is missing in the query params'
            );
            err.status = 400;
            return next(err);
        }

        let jobs;

        if (req.user.accessLevel === 'ADMIN') {
            jobs = await models.job.findAll({ where: { companyID } });
        }

        if (
            req.user.accessLevel === 'COORDINATOR' ||
            req.user.accessLevel === 'STUDENT'
        ) {
            jobs = await models.job.findAll({
                where: { companyID, year: req.user.gradYear },
            });
        }

        if (!jobs || jobs.length === 0) {
            const err = new EmptyRecords('No jobs found');
            err.status = 404;
            p;
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
        let jobs;

        jobs = await models.job.findAll({ where: req.body });

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
