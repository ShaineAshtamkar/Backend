const fs = require("fs").promises;
const path = require("path");

const recipesFilePath = path.join(__dirname, "..", "data", "recipes.json");

const readRecipesFromFile = async () => {
    try {
        const data = await fs.readFile(recipesFilePath, "utf-8");
        return JSON.parse(data || "[]");
    } catch (error) {
        const err = new Error("Failed to read recipes data");
        err.statusCode = 500;
        throw err;
    }
};


const writeRecipesToFile = async (recipes) => {
    try {
        await fs.writeFile(recipesFilePath, JSON.stringify(recipes, null, 2));
    } catch (error) {
        const err = new Error("Failed to write recipes data");
        err.statusCode = 500;
        throw err;
    }
};

module.exports = {
    readRecipesFromFile,
    writeRecipesToFile,
};