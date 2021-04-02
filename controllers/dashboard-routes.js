const router = require('express').Router();
const { User, Blog, Meal } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    console.log(req.session);

    Blog.findAll({
        where: {
            creator_id: req.session.user_id
        },
        //change this, users choice
        order: [['created_at', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Meal,
                attributes: ['content', 'user_id'],
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
            'title',
            'creator_id',
            'content',
            //change to user entry lunch dinner etc
            //'created_at',
        ],
        include: [
            {
                model: Meal,
                attributes: ['content', 'user_id', 'blog_id'],
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