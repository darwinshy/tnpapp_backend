const Sequelize = require('sequelize');

module.exports = (sequelize) =>
    sequelize.define('company', {
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
        updatedBy: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });
