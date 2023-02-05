const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const User = require('../models/user');
const Company = require('../models/company');

const UserCompany = sequelize.define('UserCompany', {
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

User.belongsToMany(Company, { through: UserCompany });
Company.belongsToMany(User, { through: UserCompany });

UserCompany.sync();

module.exports = UserCompany;
