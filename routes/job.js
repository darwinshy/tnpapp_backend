const express = require('express');

const cors = require('../utils/cors');
const { verifyUser } = require('../utils/auth');
const {
    getJobByID,
    getAllJobs,
    getJobsByCompany,
    getFilteredJobs,
} = require('../controllers/job');
const { verifyJobFilters, verifyJobType } = require('../utils/filter');

// Setting up the router
const jobRouter = express.Router();

// Specify the request routes
jobRouter.use(express.json());

// _____________________________________________________________________________
// Routes

// Get job by ID
jobRouter.route('/:jobID').get(cors.corsWithOptions, verifyUser, getJobByID);

// Get all jobs
jobRouter.route('/all').get(cors.corsWithOptions, verifyUser, getAllJobs);

// Get jobs by company
jobRouter
    .route('/:companyID/all')
    .get(cors.corsWithOptions, verifyUser, getJobsByCompany);

// Filter jobs by various criteria
jobRouter
    .route('/filter')
    .get(
        cors.corsWithOptions,
        verifyUser,
        verifyJobFilters,
        verifyJobType,
        getFilteredJobs
    );

// _____________________________________________________________________________

module.exports = jobRouter;

// _____________________________________________________________________________
