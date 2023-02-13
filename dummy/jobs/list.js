const { models } = require('../../sequilize');

const jobs = [
    {
        jobID: 1,
        year: 2021,
        title: 'SDE 1',
        titleDescription: 'Software Developer Engineer',
        type: 'INTERNSHIP',
        jobDescriptionDriveLink: null,
        ctc: 1000000,
        basePay: 1000000,
        benifits: 'Includes all the benifits such as health insurance, etc.',
        stipend: 0,
        bondYear: 1,
        eligibleBranches: ['CSE', 'ECE', 'EEE'],
        eligibleDegrees: ['B.TECH', 'M.TECH'],
        eligibilityDetail: 'All the students are eligible who have CGPA greater than 8.0',
        selectionRoundCount: 3,
        selectionProcessDetail: 'The selection process will be based on the performance in the interview rounds.',
        jobLocations: ['Bangalore', 'Hyderabad', 'Gurugram'],
        whatsappGroupLink: '',
        createdBy: 'admin',
        updatedBy: 'admin',
    },
    {
        jobID: 2,
        year: 2023,
        title: 'SA',
        titleDescription: 'Solution Architect',
        type: 'FTE',
        jobDescriptionDriveLink: null,
        ctc: 1000000,
        basePay: 1000000,
        benifits: 'Includes all the benifits such as health insurance, etc.',
        stipend: 0,
        bondYear: 1,
        eligibleBranches: ['CSE', 'ECE', 'EEE'],
        eligibleDegrees: ['B.TECH', 'M.TECH'],
        eligibilityDetail: 'All the students are eligible who have CGPA greater than 8.0',
        selectionRoundCount: 3,
        selectionProcessDetail: 'The selection process will be based on the performance in the interview rounds.',
        jobLocations: ['Bangalore', 'Hyderabad', 'Gurugram'],
        whatsappGroupLink: '',
        createdBy: 'admin',
        updatedBy: 'admin',
    },
];

exports.createJobs = async (res) => {
    res.jobs = [];
    for (let i = 0; i < jobs.length; i++) {
        const job = await models.job.create(jobs[i]);
        res.jobs.push(job);
    }
};
