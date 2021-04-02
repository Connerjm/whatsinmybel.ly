const { User } = require('../models');

const userData = [
  {
    name: 'rikio',
    email: 'rikio@email.com',
    password: 'password'
  }
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
