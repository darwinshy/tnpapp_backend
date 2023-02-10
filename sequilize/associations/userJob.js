const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('application', {
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
