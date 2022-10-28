const FoodModel = function (id, type, name){
  this.id = id;
  this.type = type;
  this.name = name;
}

FoodModel.prototype.toString = function (){
  return this.id;
}

FoodModel.foods = [];

FoodModel.add = (newFood) => {
  FoodModel.foods.push(newFood)
}

const foodA = new FoodModel('1', 'vegetable', 'tomato')
const foodB = new FoodModel('2', 'meat', 'pork')

FoodModel.add(foodA);
FoodModel.add(foodB);

FoodModel.getAll = ()=>{
  return FoodModel.foods;
}

FoodModel.findById = (id)=>{
  console.log(id)
  console.log(FoodModel.getAll().find(food => food.id== id))
  return FoodModel.getAll().find(food => food.id== id)
}

FoodModel.delete = (id)=>{
  FoodModel.foods = FoodModel.foods.filter(food => food.id != id)
}

FoodModel.update = (id, data)=>{
  const foods = FoodModel.foods.map(food => food.id === id ? {...FoodModel.foods, ...data}:food)
  FoodModel.foods = foods
}

module.exports = FoodModel;
