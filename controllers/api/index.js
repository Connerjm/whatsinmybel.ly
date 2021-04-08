//Imports.
const router = require('express').Router();
const userRoutes = require('./user-routes');
const mealRoutes = require('./meal-routes');

//Define routes.
router.use('/user', userRoutes);
router.use('/meal', mealRoutes);

//Exports
module.exports = router;