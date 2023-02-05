const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Job = require('../models/job');
const User = require('../models/user');

const UserJob = sequelize.define('UserJob', {
    scholarID: {
        type: Sequelize.STRING,
        references: {
            model: User,
            key: 'scholarID',
        },
    },
    jobID: {
        type: Sequelize.STRING,
        references: {
            model: Job,
            key: 'jobID',
        },
    },
    year: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    status: {
        type: Sequelize.ENUM('APPLIED', 'SHORTLISTED', 'REJECTED'),
        allowNull: false,
    },
});

User.belongsToMany(Job, { through: UserJob });
Job.belongsToMany(User, { through: UserJob });

UserJob.sync();

module.exports = UserJob;
