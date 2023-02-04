const express = require('express');

const { User } = require('../models/user');

const cors = require('../utils/cors');
const { verifyUser, verifyToken } = require('../utils/auth');

// Setting up the variables
const userRouter = express.Router();

// Specify the request routes
userRouter.use(express.json());

// get user profile by access token
userRouter
    .route('/profile/me')
    .get(cors.corsWithOptions, verifyToken, (req, res, next) => {
        try {
            if (req.user) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({ ok: true, user: req.user.toJSON() });
            } else {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'application/json');
                res.json({ ok: false, user: 'ProfileNotFound' });
            }
        } catch (error) {
            next(error);
        }
    });

userRouter
    .route('/profile/update')
    .post(cors.corsWithOptions, verifyToken, (req, res, next) => {
        if (req.user) {
            User.update(
                {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    phone: req.body.phone,
                    address: req.body.address,
                    city: req.body.city,
                    state: req.body.state,
                    zip: req.body.zip,
                    country: req.body.country,
                },
                {
                    where: {
                        id: req.user.id,
                    },
                }
            )
                .then((user) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({ ok: true, user: user });
                })
                .catch((err) => next(err));
        } else {
            res.setHeader('Content-Type', 'application/json');
            if (req.noToken) {
                res.statusCode = 401;
                res.json({ ok: false, message: 'No token provided' });
            } else {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'application/json');
                res.json({ ok: false, user: 'ProfileNotFound' });
            }
        }
    });

module.exports = userRouter;
