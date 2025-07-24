const express = require("express");
const router = express.Router();

// Api index
router.get("/", (req, res) => {
    res.send("Welcome to the VegApi!");
});

// Placeholder route for fetching all recipes
router.get("/recipes", (req, res) => {
    res.send("List of recipes");
});

// Placeholder route for fetching a specific recipe
router.get("/recipes/:id", (req, res) => {
    res.send(`Recipe with ID: ${req.params.id}`);
});

// Placeholder route for refreshing recipes
router.post("/recipes/refresh", (req, res) => {
    res.send("Recipes refreshed");
});

module.exports = router;
