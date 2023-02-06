const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Job = sequelize.define('job', {
    jobID: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
    },
    position: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    yaer: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    type: {
        type: Sequelize.ENUM(
            'FULLTIME',
            'INTERNSHIP',
            'INTERN+FTE',
            'INTERN+PPO')
    },
    internDuration: {
        type: Sequelize.NUMBER,
        allowNull: true,
    },
    jdLink: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    postDate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    ctc: {
        type: Sequelize.NUMBER,
        allowNull: true,
    },
    bond: {
        type: Sequelize.NUMBER,
        allowNull: true,
    },
    eligibleBranches: {
        type: Sequelize.ARRAY,
        allowNull: true,
    },
    eligibleCourses: {
        type: Sequelize.ARRAY,
        allowNull: true,
    },
    eligibility: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    noOfRounds: {
        type: Sequelize.NUMBER,
        allowNull: true,
    },
    process: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    jobLocations: {
        type: Sequelize.ARRAY,
        allowNull: true,
    },
    notes: {
        type: sequelize.STRING,
        allowNull: true
    }
});

Job.sync();

module.exports = Job;
