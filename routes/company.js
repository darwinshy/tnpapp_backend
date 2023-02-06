const express = require('express');

const cors = require('../utils/cors');
const { verifyUser, verifyAdminOrCoordinator } = require('../utils/auth');
const {
    getCompanyByID,
    getAllCompanies,
    addNewCompany,
    updateCompany,
} = require('../controllers/company');
const { verifyJobParameters } = require('../utils/job');

// Setting up the router
const companyRouter = express.Router();

// Specify the request routes
companyRouter.use(express.json());

// Middleware Handlers
let verifyHandlers = [verifyAdminOrCoordinator, verifyJobParameters];

// _____________________________________________________________________________
// Routes

// Get company by ID
companyRouter
    .route('/:companyID')
    .get(cors.corsWithOptions, verifyUser, getCompanyByID);

// Get all company
companyRouter
    .route('/all')
    .get(cors.corsWithOptions, verifyUser, getAllCompanies);

// Create a company
companyRouter
    .route('/create')
    .post(cors.corsWithOptions, verifyUser, ...verifyHandlers, addNewCompany);

// Update a job using by ID
companyRouter
    .route('/:companyID/update')
    .patch(cors.corsWithOptions, verifyUser, ...verifyHandlers, updateCompany);

// _____________________________________________________________________________

module.exports = companyRouter;

// _____________________________________________________________________________
