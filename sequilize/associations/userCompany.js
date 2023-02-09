const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('UserCompany', {
        year: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    });
};
