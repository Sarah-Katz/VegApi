const recipeModel = require("../models/recipeModel");

/**
 * Retrieves all recipes from the database.
 * @returns {Array<Recipe>} An array of Recipe model instances.
 */
exports.getAllRecipes = () => {
    return recipeModel.getAllRecipes();
};

/**
 * Retrieves a recipe by its ID from the database.
 * @param {number} id 
 * @returns {Recipe} A Recipe model instance.
 */
exports.getRecipeById = (id) => {
    return recipeModel.getRecipeById(id);
};
