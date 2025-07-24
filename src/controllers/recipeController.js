const recipeService = require("../services/recipeService");

/**
 * @returns {void} Sends a JSON response containing all recipes or an error message.
 */
exports.getAllRecipes = (req, res) => {
    recipeService
        .getAllRecipes()
        .then((recipes) => res.json(recipes))
        .catch((err) => res.status(500).send(err.message));
};

/**
 * @return {void} Sends a JSON response containing the recipe with the given ID or an error message.
 */
exports.getRecipeById = (req, res) => {
    const { id } = req.params;
    recipeService
        .getRecipeById(id)
        .then((recipe) => res.json(recipe))
        .catch((err) => res.status(500).send(err.message));
};
