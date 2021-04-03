const router = require('express').Router();

const userRoutes = require('./user-routes');
const mealRoutes = require('./Meal');

//js routes
router.use('/user-routes', userRoutes);
router.use('/Meal', mealRoutes);

module.exports = router;