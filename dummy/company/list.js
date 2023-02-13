const { models } = require('../../sequilize');

const companies = [
    {
        companyID: '1',
        companyName: 'Amazon',
        companyDescription:
            'Amazon.com, Inc. is an American multinational technology company focusing on e-commerce, cloud computing, online advertising, digital streaming, and artificial intelligence.',
        companyLogoImageLink:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png',
        companyWebsiteLink: 'https://www.amazon.com/',
        createdBy: 'admin',
        updatedBy: 'admin',
    },
    {
        companyID: '2',
        companyName: 'Google',
        companyDescription:
            'Google LLC is an American multinational technology company that specializes in Internet-related services and products, which include online advertising technologies, search engine, cloud computing, software, and hardware.',
        companyLogoImageLink:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png',
        companyWebsiteLink: 'https://www.google.com/',
        createdBy: 'admin',
        updatedBy: 'admin',
    },
];

exports.createCompanies = async (res) => {
    res.companies = companies;
    await models.company.bulkCreate(companies);
};
