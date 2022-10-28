const express = require("express");
const router = express.Router();

const FoodController = require('../controllers/food')

router.get('/', FoodController.getIndex)
router.get('/create', FoodController.getCreate)
router.post('/create', FoodController.postCreate)
router.post('/:id/delete', FoodController.delete)
router.get('/:id/update', FoodController.getUpdate)
router.post('/:id/update', FoodController.postUpdate)

module.exports = router;