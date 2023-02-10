const { MissingRequiredPayload } = require('./errors');

exports.verifyJobParameters = (req, res, next) => {
    const isCreating = req.originalUrl.includes('create');

    const requiredParams = [
        'year',
        'title',
        'type',
        'ctc',
        'eligibleBranches',
        'eligibleDegrees',
        'whatsappGroupLink',
    ];

    const validParams = [
        'year',
        'title',
        'type',
        'jobDescriptionDriveLink',
        'ctc',
        'basePay',
        'benifits',
        'stipend',
        'bondYear',
        'eligibleBranches',
        'eligibleDegrees',
        'eligibilityDetail',
        'selectionRoundCount',
        'selectionProcessDetail',
        'jobLocations',
        'whatsappGroupLink',
        'notes',
    ];

    const params = Object.keys(req.body);

    // if (isCreating && requiredParams.length !== params.length) {
    //     const err = new MissingRequiredPayload(
    //         `One or more required parameter are missing. ${requiredParams} are the required parameters.`
    //     );
    //     err.status = 400;
    //     return next(err);
    // }

    if (params.length === 0) {
        const err = new MissingRequiredPayload(
            `Atleast one parameter in the body is required`
        );
        err.status = 400;
        return next(err);
    }

    params.forEach((el) => {
        if (!validParams.includes(el)) {
            const err = new InvalidQueryParam(`${el} is not a valid params`);
            err.status = 400;
            return next(err);
        }
    });

    next();
};
