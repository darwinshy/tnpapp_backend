const User = require('../models/user');
const { getToken } = require('../utils/auth');

exports.googleAuthCallback = async (req, res, next) => {
    try {
        if (req.user) {
            const token = getToken({ _id: req.user.authID });
            const user = await User.findByPk(req.user.authID);

            user.lastLogin = Date.now();
            user.accessToken = token;

            await user.save();

            res.send({
                ok: true,
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
};
