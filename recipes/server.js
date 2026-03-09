const app = require("./app");
const { sequelize } = require('./db/models');

const PORT = process.env.PORT || 3000;

// Test database connection
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connection established successfully.');
    } catch (error) {
        console.error('❌ Unable to connect to database:', error);
    }
}

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await testConnection();
});

