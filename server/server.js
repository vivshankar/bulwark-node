// import dependencies and initialize express
const express = require('express');
const session = require('express-session')
const path = require('path');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');

const sessionRoutes = require('./routes/session-route');
const factorsRoutes = require('./routes/factors-route');

const app = express();

// register templates
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'default',
    layoutsDir: __dirname + '/../views/layouts/',
    partialsDir: __dirname + '/../views/partials/'
}));

app.use(session({
    secret: 'supersecret',
    resave: false,
    saveUninitialized: true,
    cookie: { path: '/', maxAge: 120 * 1000 }
}))

app.set('view engine', 'hbs');

// enable parsing of http request body
app.use(express.json())

// routes and api calls
app.use('/', sessionRoutes);
app.use('/factors', factorsRoutes);

// Static assets
app.use(express.static(path.join(__dirname, '../public')));

// start node server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App UI available http://localhost:${port}`);
});

module.exports = app;