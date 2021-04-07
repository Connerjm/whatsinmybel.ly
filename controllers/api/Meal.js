const router = require('express').Router();
const { Meal } = require('../../models');

// The `/api/meal` endpoint

// get all meals
router.get('/', async (req, res) => {
  // find all meals
  try
  {
    const mealData = await Meal.findAll();
    res.status(200).json(mealData);
  }
  catch (err)
  {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single meal by its `id`
  try
  {
    const mealData = await  Meal.findByPk(req.params.id);
    res.status(200).json(mealData);
  }
  catch (err)
  {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  Meal.create(req.body)
    .then((meal) => {
      res.status(200).json(meal);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try
  {
    const mealData = await Meal.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!mealData)
    {
      res.status(404).json({message: "No meal found with this id"});
      return;
    }

    res.status(200).json(mealData);
  }
  catch (err)
  {
    res.status(500).json(err);
  }
});

module.exports = router;