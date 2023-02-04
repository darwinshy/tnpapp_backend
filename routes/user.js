const express = require('express');

const { User } = require('../models/user');

const cors = require('../utils/cors');
const { verifyUser, verifyToken } = require('../utils/auth');

// Setting up the variables
const userRouter = express.Router();

// Specify the request routes
userRouter.use(express.json());

userRouter
    .route('/profile/me')
    .get(cors.corsWithOptions, verifyToken, (req, res, next) => {
        if (req.user) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ ok: true, user: req.user.toJSON() });
        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.json({ ok: false, user: 'ProfileNotFound' });
        }
    });

module.exports = userRouter;
