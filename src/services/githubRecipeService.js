require("dotenv").config();
const axios = require("axios");
const db = require("../database");

const GITHUB_API_URL = "https://api.github.com";
const REPO_OWNER = "aklipf";
const REPO_NAME = "vegan-recipes";
const REPO_PATH = "content";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

/**
 * Fetches recipes from a GitHub repository, retrieving their content and associated metadata.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of recipe data.
 * @throws Will throw an error if the request to GitHub fails.
 */
async function fetchRecipes() {
    try {
        const headers = {
            Authorization: `token ${GITHUB_TOKEN}`,
        };

        const categoriesResponse = await axios.get(`${GITHUB_API_URL}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${REPO_PATH}`, {
            headers,
        });
        const categories = categoriesResponse.data;

        const recipes = [];

        for (const category of categories) {
            if (category.type === "dir") {
                const recipesResponse = await axios.get(
                    `${GITHUB_API_URL}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${REPO_PATH}/${category.name}`,
                    { headers }
                );
                const recipeDirs = recipesResponse.data;

                for (const recipeDir of recipeDirs) {
                    if (recipeDir.type === "dir") {
                        const indexFileResponse = await axios.get(
                            `${GITHUB_API_URL}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${REPO_PATH}/${category.name}/${recipeDir.name}/index.md`,
                            { headers }
                        );
                        const recipeContent = Buffer.from(indexFileResponse.data.content, "base64").toString("utf-8");

                        const imageName = `${recipeDir.name}.jpg`;
                        const imageUrl = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/${REPO_PATH}/${category.name}/${recipeDir.name}/${imageName}`;

                        recipes.push({
                            category: category.name,
                            name: recipeDir.name,
                            content: recipeContent,
                            imageUrl: imageUrl,
                        });
                    }
                }
            }
        }
        return recipes;
    } catch (error) {
        console.error("Error fetching recipes:", error);
        throw error;
    }
}

/**
 * Stores an array of recipe objects into the database.
 *
 * @param {Array} recipes - An array of recipe objects to be stored.
 * Each recipe object should contain the following properties:
 *   - {string} category - The category of the recipe.
 *   - {string} name - The name of the recipe.
 *   - {string} content - The content of the recipe in markdown format.
 *   - {string} imageUrl - The URL of the recipe's image.
 *
 * @returns {Promise<void>} A promise that resolves when all recipes have been successfully stored in the database.
 * Throws an error if any of the database operations fail.
 */
async function storeDataToDb(recipes) {
    try {
        const dbPromises = recipes.map((recipe) => {
            const parsedContent = manualParseRecipeContent(recipe.content);
            return new Promise((resolve, reject) => {
                db.run(
                    `INSERT INTO recipes (title, description, authors, tags, ingredients, image, cookingTime, instructions) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        parsedContent.title || recipe.name,
                        parsedContent.description || "",
                        JSON.stringify(parsedContent.authors || []),
                        JSON.stringify(parsedContent.tags || []),
                        JSON.stringify(parsedContent.ingredients || []),
                        recipe.imageUrl,
                        parsedContent.cooking_time || "",
                        parsedContent.instructions || "",
                    ],
                    (err) => {
                        if (err) {
                            return reject(err);
                        }
                        resolve();
                    }
                );
            });
        });

        await Promise.all(dbPromises);
        console.log("Recipes stored in the database successfully.");
    } catch (error) {
        console.error("Error storing recipes in the database:", error);
        throw error;
    }
}

/**
 * Parses the content of a recipe in markdown format to extract structured data.
 *
 * @param {string} content - The markdown content of the recipe, expected to contain metadata in TOML format.
 * @returns {Object} An object containing the parsed recipe data, including:
 *   - {string} title
 *   - {string} description
 *   - {Array<string>} authors
 *   - {Array<string>} tags
 *   - {Array<string>} ingredients
 *   - {string} cooking_time
 *   - {string} instructions
 */
function manualParseRecipeContent(content) {
    const parsedContent = {};

    // Use regular expressions to extract fields
    const titleMatch = content.match(/title\s*=\s*"([^"]+)"/);
    const descriptionMatch = content.match(/description\s*=\s*"([^"]+)"/);
    const authorsMatch = content.match(/authors\s*=\s*\[([^\]]+)\]/);
    const tagsMatch = content.match(/tags\s*=\s*\[([^\]]+)\]/);
    const ingredientsMatch = content.match(/ingredients\s*=\s*\[([^\]]+)\]/);
    const cookingTimeMatch = content.match(/cooking_time\s*=\s*"([^"]+)"/);

    if (titleMatch) parsedContent.title = titleMatch[1];
    if (descriptionMatch) parsedContent.description = descriptionMatch[1];
    if (authorsMatch)
        parsedContent.authors = authorsMatch[1]
            .replace(/"/g, "")
            .split(",")
            .map((s) => s.trim());
    if (tagsMatch)
        parsedContent.tags = tagsMatch[1]
            .replace(/"/g, "")
            .split(",")
            .map((s) => s.trim());
    if (ingredientsMatch)
        parsedContent.ingredients = ingredientsMatch[1]
            .replace(/"/g, "")
            .split(",")
            .map((s) => s.trim());
    if (cookingTimeMatch) parsedContent.cooking_time = cookingTimeMatch[1];

    // Extract instructions by assuming they are after the TOML block
    const instructionsMatch = content.split("+++")[2];
    if (instructionsMatch) parsedContent.instructions = instructionsMatch.trim();

    return parsedContent;
}

module.exports = {
    fetchRecipes,
    storeDataToDb,
};
