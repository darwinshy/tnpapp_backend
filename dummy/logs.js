const { models } = require('../sequilize');

const successLogs = async (res) => {
    // console.log('\033c');
    console.log('------------------------------------------------');
    console.log('◦ Database synced                              ◦');
    console.log('------------------------------------------------');
    console.log('◦ Added associations for models                ◦');
    console.log('------------------------------------------------');
    console.log('user', models.user.associations);
    console.log('company', models.company.associations);
    console.log('job', models.job.associations);

    console.log('------------------------------------------------');
    console.log('◦ User Created                                 ◦');
    console.log('------------------------------------------------');
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

    console.log('------------------------------------------------');
    console.log('◦ Companies Created                            ◦');
    console.log('------------------------------------------------');
    res.companies.forEach((company) =>
        console.log(`${company.companyID} : ${company.companyName}`)
    );
    console.log('------------------------------------------------');
    console.log('◦ Job Openings Created                         ◦');
    console.log('------------------------------------------------');
    res.jobs.forEach((job) => console.log(`${job.jobID} : ${job.title}`));
    console.log('------------------------------------------------');
    console.log('◦ Coordinator creation completed               ◦');
    console.log('------------------------------------------------');
    console.log('Shashwat: ', res.coordinators.Shashwat);
    console.log('Daniyal: ', res.coordinators.Daniyal);
    console.log('------------------------------------------------');
    console.log('◦ Opening creation completed                   ◦');
    console.log('------------------------------------------------');
    console.log('Amazon: ', res.openings.Amazon);
    console.log('Google: ', res.openings.Google);
    console.log('------------------------------------------------');
};

module.exports = successLogs;
