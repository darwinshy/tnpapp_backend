const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('userJob', {
        scholarID: {
            type: Sequelize.STRING,
            allowNull: false,
            references: {
                model: sequelize.models.user,
                key: 'scholarID',
            },
        },
        jobID: {
            type: Sequelize.STRING,
            allowNull: false,
            references: {
                model: sequelize.models.job,
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
};
