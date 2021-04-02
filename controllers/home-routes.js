const router = require('express').Router();
const { Blog, User, Meal } = require('../models');
const withAuth = require('../utils/auth');
const timeStamp = require('../utils/helpers');

// GET the homepage
router.get('/', (req, res) => {
    //cordinate with handlebars
    Blog.findAll({
        attributes: [
            'id',
            'title',
            'content',
            
        ],
        //change the created at, log in order depending on users selection
        order: [['created_at', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Meal,
                attributes: ['content'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
        .then(trackerData => {
            const entries = trackerData.map(Meal => Meal.get({ plain: true }));
            res.render('homepage', {
                entries,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

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
router.get('/new-meal', withAuth, (req, res) => {
    if (req.session.loggedIn) {
        res.render('new-meal', { loggedIn: true });
    }
});

//one Meal route
router.get(' Meal/:id', withAuth, (req, res) => {
    Blog.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'creator_id', 'content'],
        include: [
            {
                model: Meal,
                attributes: ['id', 'content', 'user_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then (entryData => {
            if (entryData) {
                res.status(404).json({ message: "We didn't find a post with that ID!" });
                return;
            }

            const blog = entryData.get({ plain: true });
            res.render('single Meal', { blog, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;