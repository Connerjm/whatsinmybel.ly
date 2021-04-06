//Imports.
const sequelize = require('../config/connection');
const { User } = require('../models');
const { Meal } = require('../models');

//Grab the json data files.
const userData = require('./userData.json');
const mealData = require('./mealData.json');

//Single function to seed the DB.
const seedDatabase = async () => {
  //Remake the DB tables.
  await sequelize.sync({ force: true });

  //Create all the users.
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  //Create all the meals.
  await Meal.bulkCreate(mealData, {
    individualHooks: true,
    returning: true,
  });

  //End program when done.
  process.exit(0);
};

//Run the function.
seedDatabase();

// const seedMeal = require('./meal-seeds');
// const seedUser = require('./user-seeds')


// const sequelize = require('../config/connection');

// const seedAll = async () => {
//   await sequelize.sync({ force: true });
//   console.log('\n----- DATABASE SYNCED -----\n');
//   await seedMeal();
//   console.log('\n----- MEALS SEEDED -----\n');
//   await seedUser();
//   console.log('\n----- USERS SEEDED -----\n')

//   process.exit(0);
// };

// seedAll();
