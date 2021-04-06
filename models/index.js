// import models
const Meal = require('./Meal');
const User = require('./User');

// Meal belongsTo one User
Meal.belongsTo(User, {
  foreignKey: "user_id"
});

// Users have many Meals
User.hasMany(Meal, {
  foreignKey: "user_id",
  onDelete: "CASCADE"
});

//Export them.
module.exports = {
  Meal,
  User
}