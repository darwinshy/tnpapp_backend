const { models } = require('../sequilize');
const sequelize = require('../sequilize');
const successLogs = require('./logs');

const { createUsers } = require('./users/user');
const { createCompanies } = require('./company/list');
const { createJobs } = require('./jobs/list');
const createCoordinators = require('./coordinators');
const createOpenings = require('./openings');

require('dotenv').config();

let res = {};

const main = async (res) => {
    try {
        await sequelize.authenticate();
        await setupDatabase();

        await createUsers(res);
        await createCompanies(res);
        await createJobs(res);

        await createCoordinators(res);
        await createOpenings(res);

        await sequelize.close();

        successLogs(res);

        process.exit();
    } catch (err) {
        console.error(err);
    }
};

const setupDatabase = async () => {
    await models.user.sync();
    await models.user.destroy({ where: {} });

    await models.company.sync();
    await models.company.destroy({ where: {} });

    await models.job.sync();
    await models.job.destroy({ where: {} });

    await models.application.sync();
    await models.application.destroy({ where: {} });

    await models.coordinator.sync();
    await models.coordinator.destroy({ where: {} });

    await models.opening.sync();
    await models.opening.destroy({ where: {} });
};

main(res);
