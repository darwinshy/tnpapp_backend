const express = require('express');

const cors = require('../utils/cors');
const { verifyUser, verifyAOC } = require('../utils/auth');
const { verifyJobFilters, verifyJobType } = require('../utils/filter');
const { verifyJobParameters } = require('../utils/job');
const { parseIntQueryParam } = require('../utils/parser');

const {
    getJobByID,
    getAllJobs,
    getJobsByCompany,
    getFilteredJobs,
    addNewJob,
    updateJob,
} = require('../controllers/job');

// Setting up the router
const jobRouter = express.Router();

// Specify the request routes
jobRouter.use(express.json());

// Middleware Handlers
const corsAndVerifyUser = [cors.corsWithOptions, verifyUser];
const createJobHandlers = [verifyAOC, verifyJobParameters, parseIntQueryParam, addNewJob];
const updateJobHandlers = [verifyAOC, verifyJobParameters, parseIntQueryParam, updateJob];
const filterJobsHandlers = [verifyJobFilters, verifyJobType, getFilteredJobs];
const getJobsByCompanyIDHandlers = [parseIntQueryParam, getJobsByCompany];
const getjobProfileByIDHandlers = [parseIntQueryParam, getJobByID];

// _____________________________________________________________________________
// Routes

// Get all jobs
jobRouter.route('/all').get(...corsAndVerifyUser, getAllJobs);

// Create a new job for a company
jobRouter.route('/:companyID/create').post(...corsAndVerifyUser, ...createJobHandlers);

// Get job by ID
jobRouter.route('/:jobID/profile').get(...corsAndVerifyUser, ...getjobProfileByIDHandlers);

// Update a job using jobID
jobRouter.route('/:jobID/update').patch(...corsAndVerifyUser, ...updateJobHandlers);

// Get jobs by company ID
jobRouter.route('/:companyID/jobs').get(...corsAndVerifyUser, ...getJobsByCompanyIDHandlers);

// Filter jobs by various criteria
jobRouter.route('/filter').get(...corsAndVerifyUser, ...filterJobsHandlers);

// _____________________________________________________________________________

module.exports = jobRouter;

// _____________________________________________________________________________
