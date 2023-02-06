const Job = require('../models/job');

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
            const err = new MissingQueryParam('jobID');
            err.status = 400;
            return next(err);
        }

        let job = await Job.findByPk(jobID);

        if (!job) {
            const err = new EmptyRecords('No jobs found');
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
            jobs = await Job.findAll();
        }

        if (
            req.user.accessLevel === 'COORDINATOR' ||
            req.user.accessLevel === 'STUDENT'
        ) {
            jobs = await Job.findAll({
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

// Students and Coordinators can only access jobs for their grad year
exports.getJobsByCompany = async (req, res, next) => {
    try {
        const companyID = req.params.companyID;

        if (!companyID) {
            const err = new MissingQueryParam('companyID');
            err.status = 400;
            return next(err);
        }

        let jobs;

        if (req.user.accessLevel === 'ADMIN') {
            jobs = await Job.findAll({ where: { companyID } });
        }

        if (
            req.user.accessLevel === 'COORDINATOR' ||
            req.user.accessLevel === 'STUDENT'
        ) {
            jobs = await Job.findAll({
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

        jobs = await Job.findAll({ where: req.body });

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
