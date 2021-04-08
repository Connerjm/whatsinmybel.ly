//Imports.
var faker = require('faker');
const fs = require('fs');
const sequelize = require('../config/connection');
const { User, Meal } = require('../models');

//Faker function.
const fakerRun = () => {
  var randomName = faker.name.findName();
  var randomEmail = faker.internet.email();
  var randomPassword = faker.internet.password();
  return [randomName,randomEmail,randomPassword]
}

//Create fake entities.
const json1 = fakerRun();
const json2 = fakerRun();
const json3 = fakerRun();
const json4 = fakerRun();
const json5 = fakerRun();

//Write them to the file.
const userJson = () => 
    `[
      {
        "username": "${json1[0]}",
        "email": "${json1[1]}",
        "password": "${json1[2]}"
      },
      {
        "username": "${json2[0]}",
        "email": "${json2[1]}",
        "password": "${json2[2]}"
      },
      {
        "username": "${json3[0]}",
        "email": "${json3[1]}",
        "password": "${json3[2]}"
      },
      {
        "username": "${json4[0]}",
        "email": "${json4[1]}",
        "password": "${json4[2]}"
      },
      {
        "username": "${json5[0]}",
        "email": "${json5[1]}",
        "password": "${json5[2]}"
      }
    ]`

//Try to write to the file.
const init = () => {
  try {
    const jsonfile = userJson();
    fs.writeFileSync('./seeds/userData.json', jsonfile)
    console.log('Successfully wrote to json');
  } catch (error) {
    console.log(error);
  }
};

//Call the init function to populate a new userData.json file.
init();

//Grab the json data files.
const mealData = require('./mealData.json');
const userData = require('./userData.json');

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