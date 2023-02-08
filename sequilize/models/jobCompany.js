const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('jobCompany', {
        jobID: {
            type: Sequelize.STRING,
            allowNull: false,
            references: {
                model: sequelize.models.job,
                key: 'jobID',
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
