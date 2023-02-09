const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'TNP API',
            description: 'API for TNP Portal',
            servers: ['http://localhost:3001'],
        },
    },
    apis: ['routes/*.js'],
};

const specs = swaggerJsDoc(swaggerOptions);

module.exports = specs;
