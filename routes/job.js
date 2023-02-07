const express = require('express');

const cors = require('../utils/cors');
const { verifyUser, verifyAdminOrCoordinator } = require('../utils/auth');
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
let verifyHandlers = [verifyAdminOrCoordinator, verifyJobParameters];
let filterHandlers = [verifyJobFilters, verifyJobType];

// _____________________________________________________________________________
// Routes

// Get job by ID
jobRouter.route('/:jobID').get(cors.corsWithOptions, verifyUser, getJobByID);

// Get all jobs
jobRouter.route('/all').get(cors.corsWithOptions, verifyUser, getAllJobs);

// Create a new job for a company
jobRouter
    .route('/:companyID/create')
    .post(cors.corsWithOptions, verifyUser, ...verifyHandlers, addNewJob);

// Update a job using jobID
jobRouter
    .route('/:jobID/update')
    .patch(cors.corsWithOptions, verifyUser, ...verifyHandlers, updateJob);

// Get jobs by company
jobRouter
    .route('/:companyID/all')
    .get(cors.corsWithOptions, verifyUser, getJobsByCompany);

// Filter jobs by various criteria
jobRouter
    .route('/filter')
    .get(cors.corsWithOptions, verifyUser, ...filterHandlers, getFilteredJobs);

// _____________________________________________________________________________

module.exports = jobRouter;

// _____________________________________________________________________________
