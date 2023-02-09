const express = require('express');

const cors = require('../utils/cors');
const { verifyUser, verifyAOC } = require('../utils/auth');
const {
    getJobByID,
    getAllJobs,
    getJobsByCompany,
    getFilteredJobs,
    addNewJob,
    updateJob,
} = require('../controllers/job');
const { verifyJobFilters, verifyJobType } = require('../utils/filter');
const { verifyJobParameters } = require('../utils/job');

// Setting up the router
const jobRouter = express.Router();

// Specify the request routes
jobRouter.use(express.json());

// Middleware Handlers
let corsAndVerifyUser = [cors.corsWithOptions, verifyUser];
let verifyHandlers = [verifyAOC, verifyJobParameters];
let filterHandlers = [verifyJobFilters, verifyJobType];

// _____________________________________________________________________________
// Routes

// Get all jobs
jobRouter.route('/').get(...corsAndVerifyUser, getAllJobs);

// Create a new job for a company
jobRouter
    .route('/:companyID/create')
    .post(...corsAndVerifyUser, ...verifyHandlers, addNewJob);

// Get job by ID
jobRouter.route('/:jobID/profile').get(...corsAndVerifyUser, getJobByID);

// Update a job using jobID
jobRouter
    .route('/:jobID/update')
    .patch(...corsAndVerifyUser, ...verifyHandlers, updateJob);

// Get jobs by company ID
jobRouter.route('/:companyID/jobs').get(...corsAndVerifyUser, getJobsByCompany);

// Filter jobs by various criteria
jobRouter
    .route('/filter')
    .get(...corsAndVerifyUser, ...filterHandlers, getFilteredJobs);

// _____________________________________________________________________________

module.exports = jobRouter;

// _____________________________________________________________________________
