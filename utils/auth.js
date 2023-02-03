// Get the required modules
const passport = require('passport');
const jwt = require('jsonwebtoken');

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');
const { UserNotAuthorized } = require('./errors');

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
                let user = await User.findByPk(profile.id);

                if (user) {
                    return cb(null, user);
                }

                return cb(null, profile);
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

// Middleware implementation to verify a user based on JWT token, disables session handling
exports.verifyUser = passport.authenticate('jwt', { session: false });
