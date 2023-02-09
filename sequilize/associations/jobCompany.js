const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('JobCompany', {
        year: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    });
};
