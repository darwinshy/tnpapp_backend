const express = require('express');
const passport = require('passport');
const path = require('path');
const session = require('express-session');
const sequelize = require('./config/db');

require('dotenv').config();

// Import all the internal routers from the app
const indexRouter = require('./routes/');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');

// Initialise the express application
const app = express();

// Setting up the base middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: false,
    })
);

// Passport middleware initialization. It also sets up the user
// serializers and deserializers which will be enable app to
// access user attributes while authentication
app.use(passport.initialize());
app.use(passport.session());

// Setup up the router for home page and endpoints
// for unregistered users (signup/login/logout)
app.use('/', indexRouter);
app.use('/app', authRouter);

//
app.use('/api/v1/user', userRouter);

// Middleware to server the static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Connect to the database
sequelize
    .authenticate()
    .then(() => {
        console.log('Database connection has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;

    // render the error page
    res.status(err.status || 500).send({
        ok: false,
        error: err.name || 'Internal Server Error',
        message:
            err.message || 'Something went wrong, please retry in a while!',
    });
    // res.render("error");
});

module.exports = app;
