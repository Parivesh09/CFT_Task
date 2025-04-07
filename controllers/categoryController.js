const Category = require('../models/category');
const Service = require('../models/service');

exports.createCategory = async (req, res) => {
  const existingCategory = await Category.findOne({ where: { name: req.body.name } });
  if (existingCategory) return res.status(400).json({ message: 'Category already exists' });
  const category = await Category.create({ name: req.body.name });
  res.json(category);
};

exports.getCategories = async (req, res) => {
  const categories = await Category.findAll();
  res.json(categories);
};

exports.updateCategory = async (req, res) => {
  const category = await Category.findByPk(req.params.categoryId);
  if (!category) return res.status(404).json({ message: 'Not found' });

  category.name = req.body.name;
  await category.save();
  res.json(category);
};

exports.deleteCategory = async (req, res) => {
  const category = await Category.findByPk(req.params.categoryId, { include: Service });
  if (!category || category.Services.length > 0) {
    return res.status(400).json({ message: 'Cannot delete non-empty category' });
  }
  await category.destroy();
  res.json({ message: 'Category deleted' });
};
