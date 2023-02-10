const setupAssociations = (sequelize) => {
    const {
        user,
        company,
        job,
        UserCompany,
        UserJob,
        CoordinatorCompany,
        JobCompany,
    } = sequelize.models;

    // Association for user and company (coordinator)
    user.belongsToMany(company, {
        through: CoordinatorCompany,
        foreignKey: 'coordinatorID',
        otherKey: 'companyID',
    });
    company.belongsToMany(user, {
        through: CoordinatorCompany,
        foreignKey: 'companyID',
        otherKey: 'coordinatorID',
    });

    // Association for company and job (posted)
    job.belongsToMany(company, {
        through: JobCompany,
        foreignKey: 'companyID',
        otherKey: 'jobID',
    });
    company.hasMany(job, {
        foreignKey: 'companyID',
        sourceKey: 'companyID',
    });

    // Association for user and company (applied)
    user.belongsToMany(company, {
        through: UserCompany,
        foreignKey: 'userID',
        otherKey: 'companyID',
    });
    company.belongsToMany(user, {
        through: UserCompany,
        foreignKey: 'companyID',
        otherKey: 'userID',
    });

    // Association for user and job (applied)
    user.belongsToMany(job, {
        through: UserJob,
        foreignKey: 'userID',
        otherKey: 'jobID',
    });
    job.belongsToMany(user, {
        through: UserJob,
        foreignKey: 'jobID',
        otherKey: 'userID',
    });
};

module.exports = setupAssociations;
