const express = require('express');

const cors = require('../utils/cors');
const { verifyUser, verifyAOC } = require('../utils/auth');
const { verifyJobFilters, verifyJobType } = require('../utils/filter');
const { verifyJobParameters } = require('../utils/job');
const { parseIntPathParam } = require('../utils/parser');

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
const createJobHandlers = [verifyAOC, verifyJobParameters, parseIntPathParam, addNewJob];
const updateJobHandlers = [verifyAOC, verifyJobParameters, parseIntPathParam, updateJob];
const getJobsByCompanyIDHandlers = [parseIntPathParam, getJobsByCompany];
const getjobProfileByIDHandlers = [parseIntPathParam, getJobByID];
const filterJobsHandlers = [verifyJobFilters, verifyJobType, getFilteredJobs];

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
jobRouter.route('/filter').post(...corsAndVerifyUser, ...filterJobsHandlers);

// _____________________________________________________________________________

module.exports = jobRouter;

// _____________________________________________________________________________
