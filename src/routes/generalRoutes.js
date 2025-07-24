const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");

// Welcome route for the root URL
router.get("/", (req, res) => {
    res.send("Welcome to the Vegan Recipe API!");
});

// Route to trigger the refresh of recipes
router.get("/refresh-recipes", recipeController.fetchAndStoreRecipes);

module.exports = router;
