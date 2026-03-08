const validateRecipe = (req, res, next) => {
    const {
        title,
        description,
        ingredients,
        instructions,
        cookingTime,
        servings,
        difficulty,
    } = req.body;

    const allowedDifficulties = ["easy", "medium", "hard"];

    if (!title || typeof title !== "string" || title.trim().length < 3 || title.trim().length > 100) {
        return res.status(400).json({
            error: true,
            message: "Title is required and must be a string between 3 and 100 characters",
            statusCode: 400,
        });
    }

    if (
        !description ||
        typeof description !== "string" ||
        description.trim().length < 10 ||
        description.trim().length > 500
    ) {
        return res.status(400).json({
            error: true,
            message: "Description is required and must be a string between 10 and 500 characters",
            statusCode: 400,
        });
    }

    if (
        !Array.isArray(ingredients) ||
        ingredients.length < 1 ||
        !ingredients.every((item) => typeof item === "string" && item.trim() !== "")
    ) {
        return res.status(400).json({
            error: true,
            message: "Ingredients is required and must be an array with at least one valid item",
            statusCode: 400,
        });
    }

    if (
        !Array.isArray(instructions) ||
        instructions.length < 1 ||
        !instructions.every((item) => typeof item === "string" && item.trim() !== "")
    ) {
        return res.status(400).json({
            error: true,
            message: "Instructions is required and must be an array with at least one valid item",
            statusCode: 400,
        });
    }

    if (
        cookingTime === undefined ||
        typeof cookingTime !== "number" ||
        cookingTime <= 0
    ) {
        return res.status(400).json({
            error: true,
            message: "Cooking time is required and must be a positive number",
            statusCode: 400,
        });
    }

    if (
        servings === undefined ||
        typeof servings !== "number" ||
        !Number.isInteger(servings) ||
        servings <= 0
    ) {
        return res.status(400).json({
            error: true,
            message: "Servings is required and must be a positive integer",
            statusCode: 400,
        });
    }

    if (
        !difficulty ||
        typeof difficulty !== "string" ||
        !allowedDifficulties.includes(difficulty.toLowerCase())
    ) {
        return res.status(400).json({
            error: true,
            message: 'Difficulty is required and must be one of: "easy", "medium", "hard"',
            statusCode: 400,
        });
    }

    next();
};

module.exports = validateRecipe;