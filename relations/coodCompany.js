const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const User = require('../models/user');
const Company = require('../models/company');

const CoordinatorCompany = sequelize.define('CoordinatorCompany', {
    scholarID: {
        type: Sequelize.STRING,
        references: {
            model: User,
            key: 'scholarID',
        },
    },
    companyID: {
        type: Sequelize.STRING,
        references: {
            model: Company,
            key: 'companyID',
        },
    },
    year: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});

User.belongsToMany(Company, { through: CoordinatorCompany });
Company.belongsToMany(User, { through: CoordinatorCompany });

CoordinatorCompany.sync();

module.exports = CoordinatorCompany;
