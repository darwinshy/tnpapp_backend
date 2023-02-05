const express = require('express');

const cors = require('../utils/cors');
const { verifyUser, verifyAdmin } = require('../utils/auth');

const {
    profileUpdate,
    profileMe,
    elevate,
    suelevate,
} = require('../controllers/user');

// Setting up the variables
const userRouter = express.Router();

// Specify the request routes
userRouter.use(express.json());

// Get user profile by access token
userRouter
    .route('/profile/me')
    .get(cors.corsWithOptions, verifyUser, profileMe);

// Update user profile
userRouter
    .route('/profile/update')
    .patch(cors.corsWithOptions, verifyUser, profileUpdate);

// Elevate user access level from coordinator
userRouter
    .route('/profile/:scholarID/elevate')
    .patch(cors.corsWithOptions, verifyUser, verifyAdmin, elevate);

// Elevate user access level direclty to admin
userRouter
    .route('/profile/:authID/suelevate')
    .patch(cors.corsWithOptions, verifyUser, verifyAdmin, suelevate);

module.exports = userRouter;
