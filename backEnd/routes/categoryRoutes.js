const express = require("express");
const router = express.Router();
const { createCategory, getCategories, deleteCategory } = require("../controllers/categoryController");

// Route to create a new category
router.post("/categories", createCategory);

// Route to fetch all categories
router.get("/categories", getCategories);

// Route to delete a category by ID
router.delete("/categories/:id", deleteCategory);

module.exports = router;
