const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

router.get('/recipes', recipeController.getAllRecipes);
router.get('/recipes/:id', recipeController.getRecipeById);

module.exports = router;