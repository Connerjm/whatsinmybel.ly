const { Meal } = require('../models');

const mealData = [
  {
    meal_name: 'Chicken Salad',
    calories: 650,
    fat: 14,
    carbs: 40,
    protein: 14,
    sodium: 30
  },
  {
    meal_name: 'Steak and Eggs',
    calories: 950,
    fat: 30,
    carbs: 20,
    protein: 50,
    sodium: 200
  }
];

const seedMeal = () => Meal.bulkCreate(mealData);

module.exports = seedMeal;
