const User = require('../models/user');

const { InvalidQueryParam } = require('../utils/errors');

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
