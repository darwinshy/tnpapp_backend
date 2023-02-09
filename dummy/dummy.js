const { models } = require('../sequilize');
const sequelize = require('../sequilize');
const successLogs = require('./logs');

const { createUsers } = require('./users/user');
const { createCompanies } = require('./company/list');
const { createJobs } = require('./jobs/list');

require('dotenv').config();

let res = {};

const main = async (res) => {
    try {
        await sequelize.authenticate();
        await setupDatabase();

        await createUsers(res);
        await createCompanies(res);
        await createJobs(res);

        // const company = await models.company.findByPk(1);
        // let user = await models.user.findOne({
        //     where: { scholarID: '1912033' },
        // });

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

    await models.UserCompany.sync();
    await models.UserCompany.destroy({ where: {} });

    await models.UserJob.sync();
    await models.UserJob.destroy({ where: {} });

    await models.CoordinatorCompany.sync();
    await models.CoordinatorCompany.destroy({ where: {} });

    await models.JobCompany.sync();
    await models.JobCompany.destroy({ where: {} });
};

main(res);
