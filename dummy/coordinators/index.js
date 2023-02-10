const { models } = require('../../sequilize');

const createCoordinators = async (res) => {
    const Amazon = await models.company.findByPk(1);
    const Google = await models.company.findByPk(2);

    let Shashwat = await models.user.findOne({
        where: { scholarID: '1912033' },
    });
    let Daniyal = await models.user.findOne({
        where: { scholarID: '1912061' },
    });

    // c1 has u1 and u2 as coordinators
    await Amazon.addUser(Shashwat, { through: { year: '2023' } });
    await Amazon.addUser(Daniyal, { through: { year: '2023' } });

    // c2 has u2 as coordinator
    await Google.addUser(Shashwat, { through: { year: '2022' } });
    await Google.addUser(Daniyal, { through: { year: '2023' } });

    let coordinators = {
        Shashwat: [
            {
                company: 'Amazon',
                year: '2023',
            },
            {
                company: 'Google',
                year: '2023',
            },
        ],
        Daniyal: [
            {
                company: 'Amazon',
                year: '2023',
            },
            {
                company: 'Google',
                year: '2023',
            },
        ],
    };

    res.coordinators = coordinators;
};

module.exports = createCoordinators;
