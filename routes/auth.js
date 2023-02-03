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
            // if user is in database, req.user.emails will be undefined and req.user.authID will be defined
            // and if user is not in database, req.user.emails will be defined and req.user.authID will be undefined
            const isUserNotInDB = req.user && req.user.emails;
            const isUserInDB = req.user && req.user.authID;

            // req.user is here the profile object returned by Google and
            // req.user.emails[0].value.endsWith('nits.ac.in') is a custom check to
            // ensure that only NIT students can login
            if (
                isUserNotInDB &&
                !req.user.emails[0].value.endsWith('nits.ac.in')
            ) {
                res.send({
                    success: false,
                    message: 'Please use your college email to login.',
                });

                next();
            }

            // If the user is using their college email, we create a new user
            // in our database and send the token back to the client
            if (
                isUserNotInDB &&
                req.user.emails[0].value.endsWith('nits.ac.in')
            ) {
                let newUser = new User({
                    authID: req.user.id,
                    collegeEmail: req.user.emails[0].value,
                    imageLink: req.user.photos[0].value,
                    enrollStatus: true,
                    isVerified: true,
                    lastLogin: Date.now(),
                });

                const token = getToken({ _id: req.user.id });
                newUser.accessToken = token;

                await newUser.save();

                res.send({
                    success: true,
                    accessToken: token,
                    authID: req.user.id,
                });

                next();
            }

            // If the user is already present in our database, we just send the
            // token back to the client and update the last login time
            if (isUserInDB) {
                const token = getToken({ _id: req.user.authID });
                let exUser = await User.findByPk(req.user.authID);

                exUser.lastLogin = Date.now();
                exUser.accessToken = token;

                await exUser.save();

                res.send({
                    success: true,
                    accessToken: token,
                    authID: req.user.authID,
                });
                next();
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
