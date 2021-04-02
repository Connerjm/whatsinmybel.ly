const router = require('express').Router();

const userRoutes = require('./user-routes');
const blogRoutes = require('./blog-routes');
const entryRoutes = require('./entry-routes');

//js routes
router.use('/users', userRoutes);
router.use('/blogs', blogRoutes);
router.use('/entries', entryRoutes);

module.exports = router;