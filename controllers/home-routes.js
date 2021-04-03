const router = require('express').Router();
const { User, Meal } = require('../models');
const withAuth = require('../utils/auth');
const timeStamp = require('../utils/helpers');

// User login route
router.get('/sign-in', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login');
});

// Direct user to signup page when clicking signup link
router.get('/sign-up', (req, res) => {
    res.render('signup');
});

// Route for page to create a new blog post
router.get('/add-meal', withAuth, (req, res) => {
    if (req.session.loggedIn) {
        res.render('add-meal', { loggedIn: true });
    }
});


module.exports = router;