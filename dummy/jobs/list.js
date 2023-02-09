const { models } = require('../../sequilize');

const jobs = [
    {
        jobID: 1,
        year: 2021,
        title: 'Software Developer Engineer',
        type: 'INTERNSHIP',
        jobDescriptionDriveLink: null,
        ctc: 1000000,
        basePay: 1000000,
        benifits: 'Includes all the benifits such as health insurance, etc.',
        stipend: 0,
        bondYear: 1,
        eligibleBranches: ['CSE', 'ECE', 'EEE'],
        eligibleDegrees: ['B.TECH', 'M.TECH'],
        eligibilityDetail:
            'All the students are eligible who have CGPA greater than 8.0',
        selectionRoundCount: 3,
        selectionProcessDetail:
            'The selection process will be based on the performance in the interview rounds.',
        jobLocations: ['Bangalore', 'Hyderabad', 'Gurugram'],
        whatsappGroupLink: '',
    },
    {
        jobID: 2,
        year: 2021,
        title: 'Solution Architect',
        type: 'FTE',
        jobDescriptionDriveLink: null,
        ctc: 1000000,
        basePay: 1000000,
        benifits: 'Includes all the benifits such as health insurance, etc.',
        stipend: 0,
        bondYear: 1,
        eligibleBranches: ['CSE', 'ECE', 'EEE'],
        eligibleDegrees: ['B.TECH', 'M.TECH'],
        eligibilityDetail:
            'All the students are eligible who have CGPA greater than 8.0',
        selectionRoundCount: 3,
        selectionProcessDetail:
            'The selection process will be based on the performance in the interview rounds.',
        jobLocations: ['Bangalore', 'Hyderabad', 'Gurugram'],
        whatsappGroupLink: '',
    },
];

exports.createJobs = async (res) => {
    res.jobs = [];

    const company1 = await models.company.findByPk(1);
    const company2 = await models.company.findByPk(2);

    for (let i = 0; i < jobs.length / 2; i++) {
        const job = await models.job.create(jobs[i]);
        await company1.addJob(job, { through: { year: '2023' } });
        res.jobs.push(job);
    }
    for (let i = jobs.length / 2; i < jobs.length; i++) {
        const job = await models.job.create(jobs[i]);
        await company2.addJob(job, { through: { year: '2022' } });
        res.jobs.push(job);
    }
};
