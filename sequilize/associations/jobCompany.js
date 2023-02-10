const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('opening', {
        year: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    });
};
