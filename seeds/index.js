const seedMeal = require('./meal-seeds');
const seedUser = require('./user-seeds')


const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  await seedMeal();
  console.log('\n----- MEALS SEEDED -----\n');
  await seedUser();
  console.log('\n----- USERS SEEDED -----\n')

  process.exit(0);
};

seedAll();
