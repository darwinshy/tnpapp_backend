const Sequelize = require('sequelize');
const setupAssociations = require('./setup');

const sequelize = new Sequelize('db', 'tnp', 'password', {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

const modelDefiners = [
    require('./models/user'),
    require('./models/company'),
    require('./models/job'),
];

const associationDefiners = [
    require('./models/userCompany'),
    require('./models/userJob'),
    require('./models/coordinatorCompany'),
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}

// We define all associations according to their files.
for (const associationDefiner of associationDefiners) {
    associationDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
setupAssociations(sequelize);

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;
