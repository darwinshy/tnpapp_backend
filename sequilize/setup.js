const setupAssociations = (sequelize) => {
    const { user, company, job, userCompany, userJob, coordinatorCompany } =
        sequelize.models;

    user.belongsToMany(company, {
        through: coordinatorCompany,
        foreignKey: 'scholarID',
    });
    company.belongsToMany(user, {
        through: coordinatorCompany,
        foreignKey: 'companyID',
    });

    job.belongsTo(company);
    company.hasMany(job);

    user.belongsToMany(company, {
        through: userCompany,
        foreignKey: 'scholarID',
    });
    company.belongsToMany(user, {
        through: userCompany,
        foreignKey: 'companyID',
    });

    user.belongsToMany(job, { through: userJob, foreignKey: 'scholarID' });
    job.belongsToMany(user, { through: userJob, foreignKey: 'jobID' });
};

module.exports = setupAssociations;
