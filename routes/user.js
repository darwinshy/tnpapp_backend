const express = require('express');

const cors = require('../utils/cors');
const { verifyUser, verifyAdmin, verifyAOC } = require('../utils/auth');

const {
    profileUpdate,
    profileMe,
    profileEOP,
    profileScholarID,
    profileElevate,
    superProfileElevate,
} = require('../controllers/user');

// Setting up the variables
const userRouter = express.Router();

// Specify the request routes
userRouter.use(express.json());

// Middleware Hanlers
let corsAndVerifyUser = [cors.corsWithOptions, verifyUser];
let corsAndVerifyAOC = [cors.corsWithOptions, verifyUser, verifyAOC];

// _____________________________________________________________________________
// Routes

// Get user profile by access token
userRouter.route('/me').get(...corsAndVerifyUser, profileMe);

// Setup and complete user profile for the first time
userRouter.route('/setup').patch(...corsAndVerifyUser, profileUpdate);

// Update user profile
userRouter.route('/update').patch(...corsAndVerifyUser, profileUpdate);

// Get user by scholarID
userRouter
    .route('/:scholarID/profile')
    .get(...corsAndVerifyAOC, profileScholarID);

// Set EOP status for an user using scholarID
userRouter
    .route('/:scholarID/eopstatus')
    .patch(...corsAndVerifyAOC, profileEOP);

// Elevate user access level from coordinator
userRouter
    .route('/:scholarID/elevate')
    .patch(...corsAndVerifyUser, verifyAdmin, profileElevate);

// Elevate user access level direclty to admin
userRouter
    .route('/:scholarID/suelevate')
    .patch(...corsAndVerifyUser, verifyAdmin, superProfileElevate);

// _____________________________________________________________________________

module.exports = userRouter;

// _____________________________________________________________________________
