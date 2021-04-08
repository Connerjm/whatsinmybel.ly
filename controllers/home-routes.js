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
    let stats;
    if (req.session.stats)
    {
        stats = req.session.stats;
    }
    else
    {
        stats = {
            calsLeft: 2500,
            calPerc: 0,
            prosLeft: 56,
            prosPerc: 0,
            carbsLeft: 300,
            carbsPerc: 0,
            fatsLeft: 60,
            fatsPerc: 0
        }
    }
    if (req.session.loggedIn) {
        res.render('addmeal', { loggedIn: true, stats });
    }
});

//Dashboard route.
router.get("/dashboard", withAuth, async (req, res) =>
{
    if (req.session.loggedIn){
        const userMeals = await Meal.findAll({
            where:
            {
                user_id: req.session.user_id
            },
            order: [["createdAt", "DESC"]]
        });

        const meals = userMeals.map(meal => meal.get({ plain: true }));

        const stats = {
            calsLeft: 2500,
            calPerc: 0,
            prosLeft: 56,
            prosPerc: 0,
            carbsLeft: 300,
            carbsPerc: 0,
            fatsLeft: 60,
            fatsPerc: 0
        };

        meals.forEach(el =>
        {
            stats.calsLeft -= el.calories;
            stats.prosLeft -= el.protein;
            stats.carbsLeft -= el.carbs;
            stats.fatsLeft -= el.fat;
        });

        stats.calPerc = 100 - (stats.calsLeft / 2500 * 100);
        stats.prosPerc = 100 - (stats.prosLeft / 56 * 100);
        stats.carbsPerc = 100 - (stats.carbsLeft / 300 * 100);
        stats.fatsPerc = 100 - (stats.fatsLeft / 60 * 100);

        req.session.save(() =>
        {
            req.session.stats = stats;
        });

        res.render("dashboard", { meals, loggedIn: true, stats});
    }
});

//Redirect to dash board on any other hit.
router.get("*", (req, res) =>
{
    res.redirect("/dashboard");
});

//Export router.
module.exports = router;