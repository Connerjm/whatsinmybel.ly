const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const session = {
    secret: '',
    resave: false,
    proxy: true,
    store: new SequelizeStore({
        db: tbd
    })
};

app.use(session(session));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended: true }));
app.use(express.static(path.join(_dirname, 'public')));

app.use(routes);

sequelize.sync()({force: false}).then(() => {
app.listen(PORT, () => console.log('Now Listening'));
});


//heroku compatible set up
const PORT = process.env.PORT || 3001;
