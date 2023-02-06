const User = require('../models/user');

const {
    InvalidQueryParam,
    MissingQueryParam,
    UserNotFound,
    EmptyRequestBody,
    ActionDenied,
} = require('../utils/errors');

// _____________________________________________________________________________
// Controller functions

exports.profileMe = (req, res, next) => {
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
};

exports.profileUpdate = async (req, res, next) => {
    try {
        const isSettingUp = req.originalUrl === '/api/v1/user/profile/setup';

        if (req.user) {
            const validParams = [
                'scholarID',
                'gradYear',
                'firstName',
                'lastName',
                'branch',
                'dob',
                'whatsappContact',
                'primaryContact',
                'secondaryContact',
                'personalEmail',
                'professionalEmail',
                'cgpa',
                'resumeLink',
                'socialLinks',
            ];

            if (
                isSettingUp &&
                Object.keys(req.body).length !== validParams.length
            ) {
                const err = new EmptyRequestBody(
                    `All the parameters are required. ${validParams} are the required parameters for profile setup`
                );
                err.status = 400;
                return next(err);
            }

            if (Object.keys(req.body).length === 0) {
                const err = new EmptyRequestBody(
                    `Atleast one parameter in the body is required`
                );
                err.status = 400;
                return next(err);
            }

            Object.keys(req.body).forEach((el) => {
                if (!validParams.includes(el)) {
                    const err = new InvalidQueryParam(
                        `${el} is not a valid params`
                    );
                    err.status = 400;
                    return next(err);
                }
            });

            // if social link is not an array
            if (!Array.isArray(req.body.socialLinks)) {
                const err = new InvalidQueryParam(
                    `socialLinks should be an array`
                );
                err.status = 400;
                return next(err);
            }

            let user = await User.findByPk(req.user.authID);

            user.set({
                ...req.body,
            });

            if (isSettingUp) {
                user.isVerified = true;
            }

            user.updatedBy = req.user.authID;

            await user.save();

            res.statusCode = 200;
            res.json({
                ok: true,
                message: isSettingUp
                    ? 'Profile setup successful'
                    : 'Profile update successful',
                user: user,
            });
        }
    } catch (error) {
        next(error);
    }
};

exports.elevate = async (req, res, next) => {
    try {
        if (req.user) {
            const scholarID = req.params.scholarID;

            if (!scholarID) {
                const err = new MissingQueryParam(
                    `scholarID is missing in the query params`
                );
                err.status = 400;
                return next(err);
            }

            let user = await User.findOne({ where: { scholarID: scholarID } });

            if (!user) {
                const err = new UserNotFound(
                    `No user found with the given scholarID`
                );
                err.status = 400;
                return next(err);
            }

            if (user.accessLevel === 'COORDINATOR') {
                const err = new ActionDenied(`User is already a coordinator`);
                err.status = 400;
                return next(err);
            }

            user.set({
                accessLevel: 'COORDINATOR',
                updatedBy: req.user.authID,
            });

            await user.save();

            res.statusCode = 200;
            res.json({
                ok: true,
                message: `User with ${user.scholarID} is now a coordinator`,
            });
        }
    } catch (error) {
        next(error);
    }
};

exports.suElevate = async (req, res, next) => {
    try {
        if (req.user) {
            const authID = req.params.authID;

            if (!authID) {
                const err = new MissingQueryParam(
                    `authID is missing in the query params`
                );
                err.status = 400;
                return next(err);
            }

            let user = await User.findByPk(authID);

            if (!user) {
                const err = new UserNotFound(
                    `No user found with the given authID`
                );
                err.status = 400;
                return next(err);
            }

            if (user.accessLevel === 'ADMIN') {
                const err = new ActionDenied(`User is already an admin`);
                err.status = 400;
                return next(err);
            }

            user.set({ accessLevel: 'ADMIN', updatedBy: req.user.authID });

            await user.save();

            res.statusCode = 200;
            res.json({
                ok: true,
                message: `User with ${user.authID} is now an admin`,
            });
        }
    } catch (error) {
        next(error);
    }
};
// _____________________________________________________________________________
