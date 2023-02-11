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
        let companyID = req.params.companyID;

        if (isNaN(companyID)) {
            const err = new InvalidQueryParam(
                'companyID should be of type number'
            );
            err.status = 400;
            return next(err);
        }

        companyID = parseInt(companyID);

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

        const company = await models.company.findByPk(companyID);

        if (!company) {
            const err = new EmptyRecords(
                `No company found with ID ${companyID}`
            );
            err.status = 404;
            return next(err);
        }

        let jobYear = req.body.year;
        let jobCompanyRelation;

        // check whether the job already exists with the same title and a relation to the same company with the same year
        const job = await models.job.findOne({
            where: { title: req.body.title },
        });

        if (job) {
            jobCompanyRelation = await models.JobCompany.findOne({
                where: {
                    jobID: job.jobID,
                    companyID: companyID,
                    year: jobYear,
                },
            });
        }

        if (jobCompanyRelation) {
            const err = new ActionDenied(
                'A job with the same title already exists for this company and year'
            );
            err.status = 403;
            return next(err);
        }

        delete req.body.jobYear;

        const newJob = await models.job.create(req.body);
        const newJobCompanyRelation = await company.addJob(newJob, {
            through: { year: jobYear },
        });

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ ok: true, job: job, company: newJobCompanyRelation });
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
                include: [
                    {
                        model: models.company,
                        where: { companyID },
                        attributes: [],
                    },
                ],
                where: { year: req.user.gradYear, companyID },
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
