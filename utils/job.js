const { MissingRequiredPayload } = require('./errors');

exports.verifyJobParameters = (req, res, next) => {
    const isCreating = req.originalUrl.includes('create');
    const params = Object.keys(req.body);

    const requiredCreationParams = [
        'title',
        'year',
        'type',
        'ctc',
        'eligibleBranches',
        'eligibleDegrees',
        'whatsappGroupLink',
    ];

    const validParams = [
        'title',
        'titleDesciption',
        'year',
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

    if (params.length === 0) {
        const err = new MissingRequiredPayload(`Atleast one parameter in the body is required`);
        err.status = 400;
        return next(err);
    }

    if (isCreating) {
        // Check if all required params are present
        const missingReqParams = requiredCreationParams.filter((el) => !params.includes(el));

        if (missingReqParams.length > 0) {
            const err = new MissingRequiredPayload(`Missing required params: ${missingReqParams}`);
            err.status = 400;
            return next(err);
        }
    }

    const invalidParams = params.filter((el) => !validParams.includes(el));

    if (invalidParams.length > 0) {
        const err = new MissingRequiredPayload(`Invalid params: ${invalidParams}`);
        err.status = 400;
        return next(err);
    }

    next();
};
