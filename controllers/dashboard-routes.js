const router = require('express').Router();
const { User, Meal } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    console.log(req.session);

    User.findAll({
        where: {
            creator_id: req.session.user_id
        },
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Meal,
                attributes: ['meal_name'],
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    }
                ]
            }
        ]
    })
        .then(trackerData => {
            const entries = trackerData.map(entry => entry.get({ plain: true }));
            res.render('dashboard', { entries, loggedIn: true });
        }).
        catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Edit a post
router.get('/edit/:id', withAuth, (req, res) => {
    Blog.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'meal_name',
            'calories',
            'fat',
            'carbs',
            'protein',
            'sodium'
        ],
        include: [
            {
                model: Meal,
                attributes: ['meal_name', 'calories', 'fat', 'carbs', 'protein', 'sodium'],
                include: {
                    model: User,
                    attributes: ['name']
                }
            },
            {
                model: User,
                attributes: ['name']
            }
        ]
    }).
        then(entryData => {
            if (entryData) {
                const entries = entryData.get({ plain: true });

                res.render('edit-entry', {
                    entries,
                    loggedIn: req.session.loggedIn
                });
            } else {
                res.status(404).end();
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;