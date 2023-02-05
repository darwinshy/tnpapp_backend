const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Company = sequelize.define('company', {
    companyID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    companyName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    companyDescription: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    companyLogoImageLink: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    companyWebsiteLink: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

Company.sync();

module.exports = Company;
