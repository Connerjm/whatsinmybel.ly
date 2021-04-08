//Imports
const express = require('express');
const path = require('path');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const exphbs = require('express-handlebars');

//Grab and setup assosiated files.
const sequelize = require('./config/connection');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const hbs = exphbs.create({ helpers });

//Set up the express server and port.
const app = express();
const PORT = process.env.PORT || 3001;

//Set the session rules.
const sess = {
    secret: 'secret',
    resave: false,
    proxy: true,
    saveUninitialized: false,
    store: new SequelizeStore({
        db: sequelize
    })
};

//Apply the rules.
app.use(session(sess));

//Set up handlebars.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//Required express middleware.
app.use(express.json());
app.use(express.urlencoded({extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//Set the custom routes.
app.use(routes);

//Start the server.
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log
        (`\n |-----------------------------------------------| \n |   Whatsinmybel.ly is now listening on Port ${PORT}!   |\n |-----------------------------------------------| `));
  });
