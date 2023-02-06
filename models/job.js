const Sequelize = require('sequelize');
const sequelize = require('../config/db');
const Company = require('./company');

const Job = sequelize.define('job', {
    jobID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    year: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    type: {
        type: Sequelize.ENUM('INTERNSHIP', 'FTE', 'INTERNSHIP+FTE'),
        allowNull: false,
    },
    jobDescriptionDriveLink: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    ctc: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    basePay: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    benifits: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    stipend: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    bondYear: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    eligibleBranches: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
    },

    eligibleDegrees: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
    },
    eligibilityDetail: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    selectionRoundCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    selectionProcessDetail: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    jobLocations: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
    },
    whatsappGroupLink: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    notes: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

Job.sync();

module.exports = Job;
