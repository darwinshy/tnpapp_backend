const express = require('express');

const cors = require('../utils/cors');
const {
    verifyUser,
    verifyAdmin,
    verifyAdminOrCoordinator,
} = require('../utils/auth');

const {
    profileUpdate,
    profileMe,
    elevate,
    suElevate,
    profileEOP,
} = require('../controllers/user');

// Setting up the variables
const userRouter = express.Router();

// Specify the request routes
userRouter.use(express.json());

// Middleware Hanlers
let corsAndVerifyUser = [cors.corsWithOptions, verifyUser];

// _____________________________________________________________________________
// Routes

// Get user profile by access token
userRouter.route('/profile/me').get(...corsAndVerifyUser, profileMe);

// Setup and complete user profile for the first time
userRouter.route('/profile/setup').patch(...corsAndVerifyUser, profileUpdate);

// Set EOP status for an user using scholarID
userRouter
    .route('/profile/:scholarID/eop')
    .patch(...corsAndVerifyUser, verifyAdminOrCoordinator, profileEOP);

// Update user profile
userRouter.route('/profile/update').patch(...corsAndVerifyUser, profileUpdate);

// Elevate user access level from coordinator
userRouter
    .route('/profile/:scholarID/elevate')
    .patch(...corsAndVerifyUser, verifyAdmin, elevate);

// Elevate user access level direclty to admin
userRouter
    .route('/profile/:authID/suelevate')
    .patch(...corsAndVerifyUser, verifyAdmin, suElevate);

// _____________________________________________________________________________

module.exports = userRouter;

// _____________________________________________________________________________
