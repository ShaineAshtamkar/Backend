const express = require("express");
const morgan = require("morgan");
const recipeRoutes = require("./routes/recipeRoutes");
const errorHandler = require("./middleware/errorHandler");


const app = express();
const { sequelize } = require('./db/models');

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

app.get('/users', async (req, res) => {
    try {
        const [results, metadata] = await sequelize.query('SELECT * FROM "Users"');

        res.status(200).json({
            success: true,
            users: results
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

app.post('/users', async (req, res) => {
    try {
        const { username, email, password, firstName, lastName } = req.body;

        const query = `
      INSERT INTO "Users" (id, username, email, password, "firstName", "lastName", "createdAt", "updatedAt")
      VALUES (uuid_generate_v4(), :username, :email, :password, :firstName, :lastName, NOW(), NOW())
      RETURNING *
    `;

        const [results] = await sequelize.query(query, {
            replacements: { username, email, password, firstName, lastName }
        });

        res.status(201).json({
            success: true,
            user: results[0]
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

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