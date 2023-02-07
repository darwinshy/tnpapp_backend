const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Job = require('../models/job');
const Company = require('../models/company');

const JobCompany = sequelize.define('JobCompany', {
    jobID: {
        type: Sequelize.STRING,
        references: {
            model: Job,
            key: 'jobID',
        },
    },
    companyID: {
        type: Sequelize.STRING,
        references: {
            model: Company,
            key: 'companyID',
        },
    },
    year: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});

Job.belongsTo(Company);
Company.hasMany(Job);

JobCompany.sync();

module.exports = JobCompany;
