const express = require('express');

const cors = require('../utils/cors');
const { verifyUser, verifyAdminOrCoordinator } = require('../utils/auth');
const {
    getCompanyByID,
    getAllCompanies,
    addNewCompany,
    updateCompany,
} = require('../controllers/company');
const { verifyCompanyParameters } = require('../utils/company');

// Setting up the router
const companyRouter = express.Router();

// Specify the request routes
companyRouter.use(express.json());

// Middleware Handlers
let corsAndVerifyUser = [cors.corsWithOptions, verifyUser];
let verifyHandlers = [verifyAdminOrCoordinator, verifyCompanyParameters];

// _____________________________________________________________________________
// Routes

// Get all company
companyRouter.route('/').get(...corsAndVerifyUser, getAllCompanies);

// Create a company
companyRouter
    .route('/create')
    .post(...corsAndVerifyUser, ...verifyHandlers, addNewCompany);

// Get company by ID
companyRouter
    .route('/:companyID/profile')
    .get(...corsAndVerifyUser, getCompanyByID);

// Update a job using by ID
companyRouter
    .route('/:companyID/update')
    .patch(...corsAndVerifyUser, ...verifyHandlers, updateCompany);

// _____________________________________________________________________________

module.exports = companyRouter;

// _____________________________________________________________________________
