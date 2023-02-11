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
const corsAndVerifyUser = [cors.corsWithOptions, verifyUser];
const getProfileByScholarIDHandlers = [verifyAOC, profileScholarID];
const setEOPStatusHandlers = [verifyAOC, profileEOP];
const elevateUserHandlers = [verifyAdmin, profileElevate];
const superElevateUserHandlers = [verifyAdmin, superProfileElevate];

// _____________________________________________________________________________
// Routes

// Get user profile by access token
userRouter.route('/me').get(...corsAndVerifyUser, profileMe);

// Setup and complete user profile for the first time
userRouter.route('/setup').patch(...corsAndVerifyUser, profileUpdate);

// Update user profile
userRouter.route('/update').patch(...corsAndVerifyUser, profileUpdate);

// Get user by scholarID
userRouter.route('/:scholarID/profile').get(...corsAndVerifyUser, ...getProfileByScholarIDHandlers);

// Set EOP status for an user using scholarID
userRouter.route('/:scholarID/eopstatus').patch(...corsAndVerifyUser, ...setEOPStatusHandlers);

// Elevate user access level from coordinator
userRouter.route('/:scholarID/elevate').patch(...corsAndVerifyUser, ...elevateUserHandlers);

// Elevate user access level direclty to admin
userRouter.route('/:scholarID/suelevate').patch(...corsAndVerifyUser, ...superElevateUserHandlers);

// _____________________________________________________________________________

module.exports = userRouter;

// _____________________________________________________________________________
