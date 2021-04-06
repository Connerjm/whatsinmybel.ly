//Imports
const Sequelize = require('sequelize');
require('dotenv').config();

//Declare the DB.
let sequelize;

//Create the DB.
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PW,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

//Export the DB.
module.exports = sequelize;
