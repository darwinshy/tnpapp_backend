const { models } = require('../../sequilize');

const createOpenings = async (res) => {
    const Amazon = await models.company.findByPk(1);
    const Google = await models.company.findByPk(2);

    const SDE1 = await models.job.findByPk(1);
    const SA = await models.job.findByPk(2);

    await Amazon.addJob(SA, { through: { year: '2023' } });
    await Amazon.addJob(SDE1, { through: { year: '2021' } });
    await Google.addJob(SDE1, { through: { year: '2023' } });

    let openings = {
        Amazon: [
            {
                job: 'SA',
                year: '2023',
            },
            {
                job: 'SDE1',
                year: '2021',
            },
        ],
        Google: [
            {
                job: 'SDE1',
                year: '2023',
            },
        ],
    };

    res.openings = openings;
};

module.exports = createOpenings;
