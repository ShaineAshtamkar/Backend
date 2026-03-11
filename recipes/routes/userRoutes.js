const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {
    addFavorite,
    removeFavorite,
    getFavorites
} = require('../controllers/userController');

const router = express.Router();

router.post('/favorites/:recipeId', authMiddleware, addFavorite);
router.delete('/favorites/:recipeId', authMiddleware, removeFavorite);
router.get('/favorites', authMiddleware, getFavorites);

module.exports = router;