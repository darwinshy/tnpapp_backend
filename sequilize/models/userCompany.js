const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('userCompany', {
        scholarID: {
            type: Sequelize.STRING,
            allowNull: false,
            references: {
                model: sequelize.models.user,
                key: 'scholarID',
            },
        },
        companyID: {
            type: Sequelize.STRING,
            allowNull: false,
            references: {
                model: sequelize.models.company,
                key: 'companyID',
            },
        },
        year: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    });
};
