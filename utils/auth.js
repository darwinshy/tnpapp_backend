// Get the required modules
const passport = require('passport');
const jwt = require('jsonwebtoken');

const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const JwtStrategy = require('passport-jwt').Strategy;
// const { ExtractJwt } = require('passport-jwt');

const User = require('../models/user');
const {
    UserNotAuthorized,
    UserNotFound,
    NoTokenError,
    ActionDenied,
} = require('./errors');

// Register the serializers for passport to be able to
// access the user attributes while authentication
passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((obj, cb) => cb(null, obj));

// Implementation of Google OAuth passport authentication strategy having
// scope to access the profile and email address. Once the user authorizes
// Google to let our app access their profile, Google provides the accessToken,
// refreshToken along with profile details. Based on provided profile we will
// be creating or authenticating the user and generate a custom signed jwt token
exports.googlePassport = passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CB_URL,
        },
        async (_, __, profile, cb) => {
            try {
                if (
                    profile.emails &&
                    !profile.emails[0].value.endsWith('nits.ac.in')
                ) {
                    const err = new UserNotAuthorized(
                        'Please use your college email to login.'
                    );
                    err.status = 401;
                    return cb(err, null);
                }

                let user = await User.findByPk(profile.id);

                if (user) {
                    return cb(null, user);
                }

                user = new User({
                    authID: profile.id,
                    enrollStatus: true,
                    isVerified: false,
                    lastLogin: Date.now(),
                    updatedBy: profile.id,
                    accessLevel: 'STUDENT',
                });

                user.imageLink =
                    profile.photos.length > 0 ? profile.photos[0].value : null;
                user.collegeEmail =
                    profile.emails.length > 0 ? profile.emails[0].value : null;

                await user.save();

                return cb(null, user);
            } catch (err) {
                return cb(err, null);
            }
        }
    )
);

// Provided the user data as the payload (currently passed only the  user's id)
// this middleware creates a signed token using the app's secret key having expiry of 10 days
exports.getToken = (payload, expiry) =>
    jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: expiry || 60 * 60 * 24 * 10,
    });

// Decode values from a JWT token
exports.decodeJwt = (token) => {
    if (token) {
        const base64String = token.split('.')[1];
        const decodedValue = JSON.parse(
            Buffer.from(base64String, 'base64').toString('ascii')
        );
        return decodedValue;
    }
    return null;
};

// Check whether the user authorization token is valid or not and if valid then
// pass the user details to the next middleware
exports.verifyUser = async (req, res, next) => {
    const token = req.headers.authorization;

    // If the user is trying to setup their profile then we don't need to check
    // isVerified flag
    const isSettingUp = req.originalUrl === '/api/v1/user/profile/setup';

    if (!token) {
        const err = new NoTokenError(
            'Provide a valid token in the authorization header'
        );
        err.status = 401;
        return next(err);
    }

    const tokenValue = token.split(' ')[1];

    let user = await User.findOne({ where: { accessToken: tokenValue } });

    if (!user) {
        const err = new UserNotFound('User not found for the provided token');
        err.status = 401;
        return next(err);
    }

    if (!user.isVerified && !isSettingUp) {
        const err = new ActionDenied(
            'Cannot perform this action. Complete user profile setup first.'
        );
        err.status = 401;
        return next(err);
    }

    req.user = user;

    next();
};

// This middleware verifies if the user is an admin
exports.verifyAdmin = (req, res, next) => {
    if (req.user.accessLevel === 'ADMIN') {
        next();
    } else {
        const err = new UserNotAuthorized(
            "You don't have enough permission to perform this action"
        );
        err.status = 403;
        next(err);
    }
};

// This middleware verifies if the user is a coordinator
exports.verifyCoordinator = (req, res, next) => {
    if (req.user.accessLevel === 'COORDINATOR') {
        next();
    } else {
        const err = new UserNotAuthorized(
            "You don't have enough permission to perform this action"
        );
        err.status = 403;
        next(err);
    }
};

// This middleware verifies if the user is a hiring manager
exports.verifyHiringManager = (req, res, next) => {
    if (req.user.accessLevel === 'HIRINGMANAGER') {
        next();
    } else {
        const err = new UserNotAuthorized(
            "You don't have enough permission to perform this action"
        );
        err.status = 403;
        next(err);
    }
};

// This middleware verifies if the user is a student
exports.verifyStudent = (req, res, next) => {
    if (req.user.accessLevel === 'STUDENT') {
        next();
    } else {
        const err = new UserNotAuthorized(
            "You don't have enough permission to perform this action"
        );
        err.status = 403;
        next(err);
    }
};

// Middleware implementation to verify a user based on JWT token, disables
// session handling
// exports.verifyUser = passport.authenticate('jwt', { session: false });

// Implementation of the jsonwebtoken based passport strategy
// passport.use(
//     new JwtStrategy(
//         {
//             jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//             secretOrKey: process.env.SECRET_KEY,
//         },
//         async (jwtPayload, done) => {
//             console.log(jwtPayload);

//             let user = await User.findByPk(jwtPayload._id);

//             if (!user) {
//                 const err = new UserNotFound('User not found');
//                 err.status = 401;
//                 done(null);
//             }

//             done(null, user);
//         }
//     )
// );
