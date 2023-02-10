const setupAssociations = (sequelize) => {
    const { user, company, job, application, coordinator, opening } =
        sequelize.models;

    // Association for user and company (coordinator)
    user.belongsToMany(company, {
        through: coordinator,
        foreignKey: 'coordinatorID',
        otherKey: 'companyID',
    });
    company.belongsToMany(user, {
        through: coordinator,
        foreignKey: 'companyID',
        otherKey: 'coordinatorID',
    });

    // Association for company and job (posted)
    job.belongsToMany(company, {
        through: opening,
        foreignKey: 'jobID',
        otherKey: 'companyID',
    });
    company.belongsToMany(job, {
        through: opening,
        foreignKey: 'companyID',
        otherKey: 'jobID',
    });

    // Association for user and company (applied)

    // Association for user and job (applied)
    user.belongsToMany(job, {
        through: application,
        foreignKey: 'userID',
        otherKey: 'jobID',
    });
    job.belongsToMany(user, {
        through: application,
        foreignKey: 'jobID',
        otherKey: 'userID',
    });
};

module.exports = setupAssociations;
