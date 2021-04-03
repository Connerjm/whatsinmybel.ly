const sequelize = require('../config/connection');
const { User } = require('../models');
const { Meal } = require('../models');

const userData = require('./userData.json');
const mealData = require('./mealData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Meal.bulkCreate(mealData, {
    individualHooks: true,
    returning: true,
  });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

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
