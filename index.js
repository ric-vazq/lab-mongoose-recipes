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
    Recipe.create({title: 'boiling water', level: 'Easy Peasy', ingredients: ['water'], cuisine: 'basics', dishType: 'soup', duration: 10, creator: 'God'})
    .then(recipe =>{ console.log(recipe.title)})
  })
  .then(() => {
    Recipe.insertMany(data)
      .then(recipes => {
        recipes.map(x => {console.log(x.title)})
      })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
