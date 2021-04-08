const router = require('express').Router();

const userRoutes = require('./user-routes');
const mealRoutes = require('./meal-routes');

//js routes
router.use('/user', userRoutes);
router.use('/meal', mealRoutes);

module.exports = router;