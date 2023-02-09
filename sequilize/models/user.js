const Sequelize = require('sequelize');

module.exports = (sequelize) =>
    sequelize.define('user', {
        authID: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true,
        },
        scholarID: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        gradYear: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        middleName: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        imageLink: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        branch: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        dob: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        whatsappContact: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        primaryContact: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        secondaryContact: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        personalEmail: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        collegeEmail: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        professionalEmail: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        accessLevel: {
            type: Sequelize.ENUM('ADMIN', 'COORDINATOR', 'STUDENT'),
            allowNull: true,
        },
        cgpa: {
            type: Sequelize.FLOAT,
            allowNull: true,
        },
        resumeLink: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        socialLinks: {
            type: Sequelize.ARRAY(Sequelize.STRING),
            allowNull: true,
        },
        enrollStatus: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
        },
        accessToken: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        lastLogin: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        isVerified: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
        },
        updatedBy: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        eop: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
        },
    });
