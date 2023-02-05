const User = require('../models/user');

const {
    InvalidQueryParam,
    MissingQueryParam,
    UserNotFound,
    ActionDenied,
} = require('../utils/errors');

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

            Object.keys(req.body).forEach((el) => {
                if (!validParams.includes(el)) {
                    const err = new InvalidQueryParam(
                        `${el} is not a valid params`
                    );
                    err.status = 400;
                    return next(err);
                }
            });

            let user = await User.findByPk(req.user.authID);

            // if social link is not an array
            if (!Array.isArray(req.body.socialLinks)) {
                const err = new InvalidQueryParam(
                    `socialLinks should be an array`
                );
                err.status = 400;
                return next(err);
            }

            user.set({
                scholarID: req.body.scholarID,
                gradYear: req.body.gradYear,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                branch: req.body.branch,
                dob: req.body.dob,
                whatsappContact: req.body.whatsappContact,
                primaryContact: req.body.primaryContact,
                secondaryContact: req.body.secondaryContact,
                personalEmail: req.body.personalEmail,
                professionalEmail: req.body.professionalEmail,
                cgpa: req.body.cgpa,
                resumeLink: req.body.resumeLink,
                socialLinks: req.body.socialLinks,
            });

            user.updatedBy = req.user.authID;

            await user.save();

            res.statusCode = 200;
            res.json({
                ok: true,
                message: 'Profile update successfully',
                user: user,
            });
        }
    } catch (error) {
        next(error);
    }
};

exports.profileEl = async (req, res, next) => {
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

exports.profileSuperEl = async (req, res, next) => {
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
