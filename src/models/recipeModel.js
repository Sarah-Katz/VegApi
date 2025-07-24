const db = require("../database");

/**
 * Represents a Recipe model.
 * @class Recipe
 * @property {number} id - The unique identifier for the recipe.
 * @property {string} title - The title of the recipe.
 * @property {string} description - A brief description of the recipe.
 * @property {Array<string>} authors - The authors of the recipe.
 * @property {Array<string>} tags - Tags associated with the recipe.
 * @property {Array<string>} ingredients - The ingredients required for the recipe.
 * @property {string} image - The URL of the recipe's image.
 * @property {string} cookingTime - The time required to cook the recipe.
 * @property {string} instructions - The cooking instructions for the recipe.
 */
class Recipe {
    constructor(id, title, description, authors, tags, ingredients, image, cookingTime, instructions) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.authors = authors;
        this.tags = tags;
        this.ingredients = ingredients;
        this.image = image;
        this.cookingTime = cookingTime;
        this.instructions = instructions;
    }
}

/**
 * Retrieves all recipes from the database.
 * @returns {Array<Recipe>} An array of Recipe model instances.
 * @throws {Error} If no recipes are found.
 */
exports.getAllRecipes = () => {
    let data = new Promise((resolve, reject) => {
        db.all("SELECT * FROM recipes", [], (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
    // Map the raw data to Recipe model instances
    return data.then((rows) =>
        rows.map(
            (row) =>
                new Recipe(
                    row.id,
                    row.title,
                    row.description,
                    JSON.parse(row.authors),
                    JSON.parse(row.tags),
                    JSON.parse(row.ingredients),
                    row.image,
                    row.cookingTime,
                    row.instructions
                )
        )
    );
};

/**
 * Retrieves a recipe by its ID from the database.
 * @param {number} id
 * @return {Recipe} A Recipe model instance.
 * @throws {Error} If the recipe with the given ID is not found.
 */
exports.getRecipeById = (id) => {
    let data = new Promise((resolve, reject) => {
        db.get("SELECT * FROM recipes WHERE id = ?", [id], (err, row) => {
            if (err) {
                return reject(err);
            }
            resolve(row);
        });
    });
    // Map the raw data to a Recipe model instance
    return data.then(
        (row) =>
            new Recipe(
                row.id,
                row.title,
                row.description,
                JSON.parse(row.authors),
                JSON.parse(row.tags),
                JSON.parse(row.ingredients),
                row.image,
                row.cookingTime,
                row.instructions
            )
    );
};
