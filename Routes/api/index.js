const router = require('express').Router();
const mealRoutes = require('./meal');

router.use('/meal', mealRoutes);

module.exports = router;
