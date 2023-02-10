const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('job', {
        jobID: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        year: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        titleDesciption: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        type: {
            type: Sequelize.ENUM('INTERNSHIP', 'FTE', 'INTERNSHIP+FTE'),
            allowNull: true,
        },
        jobDescriptionDriveLink: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        ctc: {
            type: Sequelize.DOUBLE,
            allowNull: true,
        },
        basePay: {
            type: Sequelize.DOUBLE,
            allowNull: true,
        },
        benifits: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        stipend: {
            type: Sequelize.DOUBLE,
            allowNull: true,
        },
        bondYear: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        eligibleBranches: {
            type: Sequelize.ARRAY(Sequelize.STRING),
            allowNull: true,
        },
        eligibleDegrees: {
            type: Sequelize.ARRAY(Sequelize.STRING),
            allowNull: true,
        },
        eligibilityDetail: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        selectionRoundCount: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        selectionProcessDetail: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        jobLocations: {
            type: Sequelize.ARRAY(Sequelize.STRING),
            allowNull: true,
        },
        whatsappGroupLink: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        notes: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    });
};
