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
    user.belongsToMany(company, { through: CoordinatorCompany });
    company.belongsToMany(user, { through: CoordinatorCompany });

    // Association for company and job (posted)
    job.belongsToMany(company, { through: JobCompany });
    company.hasMany(job, { foreignKey: 'companyID' });

    // Association for user and company (applied)
    user.belongsToMany(company, { through: UserCompany });
    company.belongsToMany(user, { through: UserCompany });

    // Association for user and job (applied)
    user.belongsToMany(job, { through: UserJob });
    job.belongsToMany(user, { through: UserJob });
};

module.exports = setupAssociations;
