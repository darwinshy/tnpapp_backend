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
    logging: false,
});

const modelDefiners = [
    require('./models/user'),
    require('./models/company'),
    require('./models/job'),
];

const associationDefiners = [
    require('./associations/userCompany'),
    require('./associations/userJob'),
    require('./associations/coordinatorCompany'),
    require('./associations/jobCompany'),
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}

// We execute each association definers inside the modelDefiners array.
for (const associationDefiner of associationDefiners) {
    associationDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
setupAssociations(sequelize);

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;
