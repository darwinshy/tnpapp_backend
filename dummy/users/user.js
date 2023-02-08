// Importing modelss
const { models } = require('../../sequilize');

// Importing users details from JSON files
const admin = require('./daniyal.json');
const coordinator = require('./shashwat.json');
const student = require('./prateek.json');

exports.createUsers = async (res) => {
    let adminUser = new models.user(admin);
    let coordinatorUser = new models.user(coordinator);
    let studentUser = new models.user(student);

    await adminUser.save();
    await coordinatorUser.save();
    await studentUser.save();

    res.adminUser = adminUser;
    res.coordinatorUser = coordinatorUser;
    res.studentUser = studentUser;
};
