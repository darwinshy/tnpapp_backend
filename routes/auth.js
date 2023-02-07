// Import all the install packages
const express = require('express');
const passport = require('passport');
const { googleAuthCallback } = require('../controllers/auth');

// Initialise the authentication router
const authRouter = express.Router();

// Include the body parser to parse the body in json
authRouter.use(express.json());

// _____________________________________________________________________________
// Auth routes

// Google OAuth authentication route
authRouter.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth authentication callback endpoint
authRouter.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureMessage: true }),
    googleAuthCallback
);

// _____________________________________________________________________________

module.exports = authRouter;

// _____________________________________________________________________________
