const express = require("express");
const morgan = require("morgan");
const recipeRoutes = require("./routes/recipeRoutes");
const errorHandler = require("./middleware/errorHandler");


const app = express();


// built-in middleware
app.use(express.json());

// logging middleware
app.use(morgan("dev"));

// health check route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Recipes API is running",
    });
});

// recipe routes
app.use("/api/recipes", recipeRoutes);

// 404 handler for unknown routes
app.use((req, res) => {
    res.status(404).json({
        error: true,
        message: "Route not found",
        statusCode: 404,
    });
});

app.use(errorHandler);


module.exports = app;