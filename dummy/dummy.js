const { models } = require('../sequilize');
const sequelize = require('../sequilize');

const { createUsers } = require('./users/user');
const { createCompanies } = require('./company/list');

require('dotenv').config();

let res = {};

const main = async (res) => {
    try {
        await sequelize.authenticate();
        await setupDatabase();

        await createUsers(res);

        await createCompanies(res);

        await sequelize.close();

        successLogs(res);

        process.exit();
    } catch (err) {
        console.error('Unable to connect to the database:', err);
    }
};

const setupDatabase = async () => {
    await models.user.sync();
    await models.user.destroy({ where: {} });

    await models.company.sync();
    await models.company.destroy({ where: {} });

    await models.job.sync();
    await models.job.destroy({ where: {} });
};

const successLogs = async (res) => {
    console.log('\033c');
    console.log('Database synced');

    console.log('-------------------------------------------------');
    console.log('User creation completed\n');
    console.log('[ADMIN]          : ', res.adminUser.firstName);
    console.log(res.adminUser.accessToken, '\n');
    console.log('[COORDINATOR]    : ', res.coordinatorUser.firstName);
    console.log(res.coordinatorUser.accessToken, '\n');
    console.log('[STUDENT]        : ', res.studentUser.firstName);
    console.log(res.studentUser.accessToken, '\n');

    // create a txt file and write access tokens
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, 'accessTokens.txt');
    const data = `ADMIN: ${res.adminUser.accessToken}\nCOORDINATOR: ${res.coordinatorUser.accessToken}\nSTUDENT: ${res.studentUser.accessToken}`;
    fs.writeFileSync(filePath, data);

    console.log('-------------------------------------------------');
    console.log('Company creation completed\n');
    res.companies.forEach((company) => {
        console.log(`${company.companyID} : ${company.companyName}`);
    });
    console.log('-------------------------------------------------');
};

main(res);
