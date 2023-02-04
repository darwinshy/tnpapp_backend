const cors = require('cors');

const whitelist = ['http://localhost:3001'];

const corsOptionsDelegate = (req, callback) => {
    callback(null, { origin: true });
    // let corsOptions;
    // if (whitelist.indexOf(req.header('Origin')) !== -1) {
    //     corsOptions = { origin: true };
    //     callback(null, corsOptions);
    // } else {
    //     corsOptions = { origin: false };
    //     callback(
    //         new Error('Origin not whitelisted, denied by CORS'),
    //         corsOptions
    //     );
    // }
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);
