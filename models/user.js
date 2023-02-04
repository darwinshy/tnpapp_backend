const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('user', {
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
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    primaryContact: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    secondaryContact: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    personalEmail: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    collegeEmail: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    professionalEmail: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    accessLevel: {
        type: Sequelize.ENUM(
            'ADMIN',
            'COORDINATOR',
            'STUDENT',
            'HIRINGMANAGER'
        ),
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
        allowNull: false,
    },
});

User.sync();

module.exports = User;
