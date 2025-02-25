const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");

// Create a new category
const createCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;

    if (!name) {
        res.status(400).json({ message: "Please provide a category name" });
        return;
    }

    const categoryExists = await Category.findOne({ name });

    if (categoryExists) {
        res.status(400).json({ message: "Category already exists" });
        return;
    }

    const category = await Category.create({
        name,
    });

    if (category) {
        res.status(201).json({
            message: "Category created successfully",
            category: category,
        });
    } else {
        res.status(400).json({ message: "Error creating category" });
    }
});

// Fetch all categories
const getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find();
    res.status(200).json(categories);
});

// Delete a category by ID
const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
        res.status(404).json({ message: "Category not found" });
        return;
    }

    await category.remove();
    res.status(200).json({ message: "Category removed successfully" });
});

module.exports = {
    createCategory,
    getCategories,
    deleteCategory,
};
