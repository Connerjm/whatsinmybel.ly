// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Meal model (table) by extending off Sequelize's Model class
class Meal extends Model {}

// set up fields and rules for Meal model
Meal.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    meal_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    calories: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: {
        isNumeric: true
      }
    },
    fat: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 10,
        validate: {
          isNumeric: true
        }
      },
    carbs: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 10,
        validate: {
            isNumeric: true
            }
    },
    protein: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 10,
        validate: {
            isNumeric: true
            }
        },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
          key: "id"
      }
    }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'meal',
  }
);

//Export the model.
module.exports = Meal;