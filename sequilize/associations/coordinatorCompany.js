const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('CoordinatorCompany', {
        year: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    });
};
