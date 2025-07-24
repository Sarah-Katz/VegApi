const githubRecipeService = require("./services/githubRecipeService");
const db = require("./database");

async function fetchAndStoreRecipes() {
    try {
        // Clear existing data
        db.run("DELETE FROM recipes", (err) => {
            if (err) {
                console.error("Error clearing existing recipes:", err);
                return;
            }
            console.log("Existing recipes cleared.");
        });

        // Fetch new recipes
        const recipes = await githubRecipeService.fetchRecipes();

        // Store new recipes
        await githubRecipeService.storeDataToDb(recipes);

        console.log("Recipes fetched and stored successfully.");
    } catch (error) {
        console.error("Failed to fetch and store recipes:", error);
    }
}

fetchAndStoreRecipes();
