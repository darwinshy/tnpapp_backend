const express = require('express');

const cors = require('../utils/cors');
const { verifyUser } = require('../utils/auth');
const { profileUpdate, profileMe } = require('../controllers/user');

// Setting up the variables
const userRouter = express.Router();

// Specify the request routes
userRouter.use(express.json());

// get user profile by access token
userRouter
    .route('/profile/me')
    .get(cors.corsWithOptions, verifyUser, profileMe);

// update user profile
userRouter
    .route('/profile/update')
    .patch(cors.corsWithOptions, verifyUser, profileUpdate);

module.exports = userRouter;
