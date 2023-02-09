const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('UserJob', {
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
