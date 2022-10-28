const FoodModel = require('../models/food');

const FoodController = {}

FoodController.getIndex = function (req, res, next){
  const allFoods = FoodModel.getAll()
  res.render('food/index', {foods: allFoods})
}

FoodController.getCreate = function(req, res){
  res.render('food/create')
}

FoodController.postCreate = function(req, res){
  const food = new FoodModel(req.body.id, req.body.type, req.body.name)
  FoodModel.add(food)

  res.redirect('/food')
}

FoodController.getUpdate = function(req, res){
  const food = FoodModel.findById(req.params.id)
  res.render('food/update', {food})
}

FoodController.postUpdate = function(req, res){
  FoodModel.update(req.params.id, {id: req.body.id, type: req.body.type, name: req.body.name})
  res.redirect('/food')
}

FoodController.delete = function(req, res){
  FoodModel.delete(req.body.id)
  res.redirect('/food')
}

module.exports = FoodController;