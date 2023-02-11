const express = require('express');

const cors = require('../utils/cors');
const { verifyUser, verifyAOC } = require('../utils/auth');
const { verifyCompanyParameters } = require('../utils/company');
const { parseIntQueryParam } = require('../utils/parser');

const { getCompanyByID, getAllCompanies, addNewCompany, updateCompany } = require('../controllers/company');

// Setting up the router
const companyRouter = express.Router();

// Specify the request routes
companyRouter.use(express.json());

// Middleware Handlers
const corsAndVerifyUser = [cors.corsWithOptions, verifyUser];
const getCompanyProfileHandlers = [parseIntQueryParam, getCompanyByID];
const createCompanyHandlers = [verifyAOC, verifyCompanyParameters, parseIntQueryParam, addNewCompany];
const updateCompanyHandlers = [verifyAOC, verifyCompanyParameters, parseIntQueryParam, updateCompany];

// _____________________________________________________________________________
// Routes

// Get all company
companyRouter.route('/all').get(...corsAndVerifyUser, getAllCompanies);

// Create a company
companyRouter.route('/create').post(...corsAndVerifyUser, ...createCompanyHandlers);

// Get company by ID
companyRouter.route('/:companyID/profile').get(...corsAndVerifyUser, ...getCompanyProfileHandlers);

// Update a job using by ID
companyRouter.route('/:companyID/update').patch(...corsAndVerifyUser, ...updateCompanyHandlers);

// _____________________________________________________________________________

module.exports = companyRouter;

// _____________________________________________________________________________
