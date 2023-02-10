const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('CoordinatorCompany', {
        coordinatorID: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        year: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    });
};
