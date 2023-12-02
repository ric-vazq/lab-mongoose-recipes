const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    return Recipe.create({title: 'boiling water', level: 'Easy Peasy', ingredients: ['water'], cuisine: 'basics', dishType: 'soup', duration: 10, creator: 'God'})
  })
  .then(newRecipe => {
    console.log(newRecipe);
    return Recipe.insertMany(data)
  })
  .then(manyRecipes => {
    console.log(manyRecipes);
    return Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100})
  })
  .then(updatedRecipe => {
    console.log(updatedRecipe);
    return Recipe.deleteOne({title: 'Carrot Cake'})
  })
  .then(deletedElement => {
    console.log(deletedElement);
    mongoose.disconnect();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
