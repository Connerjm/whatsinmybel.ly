//Imports.
const router = require('express').Router();
const { User, Meal } = require('../models');
const withAuth = require('../utils/auth');
const timeStamp = require('../utils/helpers');

/* Page routes. */

// User login route
router.get('/signin', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }
    res.render('signinorsignup', { new_user: false });
});

// Direct user to signup page when clicking signup link
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }
    res.render('signinorsignup', { new_user: true });
});

// Route for page to create a new blog post
router.get('/addmeal', withAuth, (req, res) => {
    if (req.session.loggedIn) {
        res.render('addmeal', { loggedIn: true });
    }
});

//Dashboard route.
//TODO

//Export router.
module.exports = router;