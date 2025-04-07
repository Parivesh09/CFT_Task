const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  createCategory, getCategories, updateCategory, deleteCategory
} = require('../controllers/categoryController');

router.get('/categories', auth, getCategories);
router.post('/category', auth, createCategory);
router.put('/category/:categoryId', auth, updateCategory);
router.delete('/category/:categoryId', auth, deleteCategory);

module.exports = router;
