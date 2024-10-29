import Category from "../models/category.model.js";

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const newCategory = new Category({ name });
    const savedCategory = await newCategory.save();
    if (!savedCategory) {
      return next(errorHandler(400, "Failed to create category"));
    }
    res.status(200).json(savedCategory);
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return next(errorHandler(401, "Unauthorized"));
    }
    if (!req.params.categoryId) {
      return next(errorHandler(400, "Category ID is required"));
    }
    const categoryId = req.params.categoryId;
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    res.status(200).json(deletedCategory);
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    if (!req.params.categoryId) {
      return next(errorHandler(400, "Category ID is required"));
    }
    const categoryId = req.params.categoryId;
    const category = await Category.findById(categoryId);
    if (!category) {
      return next(errorHandler(404, "Category not found"));
    }
    const { name } = req.body;
    if (!req.user.isAdmin) {
      return next(errorHandler(401, "Unauthorized"));
    }
    if (!req.body.name) {
      return next(errorHandler(400, "Name is required"));
    }
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name },
      { new: true }
    );
    res.status(200).json(updatedCategory);
  } catch (error) {
    next(error);
  }
};
