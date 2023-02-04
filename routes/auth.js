// Import all the install packages
const express = require('express');
const passport = require('passport');

// Import the custom internal modules
const User = require('../models/user');
const { getToken } = require('../utils/auth');

// Initialise the authentication router
const authRouter = express.Router();

// Include the body parser to parse the body in json
authRouter.use(express.json());

// Google OAuth authentication route
authRouter.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth authentication callback endpoint
authRouter.get(
    '/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/home',
        failureMessage: true,
    }),
    async (req, res, next) => {
        try {
            if (req.user) {
                const token = getToken({ _id: req.user.authID });
                const user = await User.findByPk(req.user.authID);

                user.lastLogin = Date.now();
                user.accessToken = token;

                await user.save();

                res.send({
                    success: true,
                    message: 'User authenticated successfully.',
                    accessToken: token,
                    authID: req.user.authID,
                });
            }
        } catch (err) {
            console.error(err);
            const error = new Error('Something went wrong. Please try again.');
            error.status = 500;
            next(error);
        }
    }
);

module.exports = authRouter;
