const itemsModel = require("../models/itemsModel");
const categoryModel = require("../models/categoriesModel");
const { body, validationResult } = require("express-validator");

// Escape HTML helper
function escapeHtml(text) {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Validation rules
const validateItem = [
  body("name")
    .trim()
    .notEmpty().withMessage("Item name is required.")
    .isLength({ max: 100 }).withMessage("Item name must be at most 100 characters."),
  body("description")
    .trim()
    .isLength({ max: 500 }).withMessage("Description must be at most 500 characters."),
  body("price")
    .notEmpty().withMessage("Price is required.")
    .isFloat({ min: 0 }).withMessage("Price must be a positive number."),
  body("quantity")
    .notEmpty().withMessage("Quantity is required.")
    .isInt({ min: 0 }).withMessage("Quantity must be a non-negative integer."),
  body("categoryId")
    .notEmpty().withMessage("Category ID is required.")
    .isInt().withMessage("Category ID must be a valid integer.")
];


async function itemsByCategoryGet(req, res) {
  const categoryId = req.params.id;

  const items = await itemsModel.getItemsByCategory(categoryId);

  res.render("categories/details", { items });
}

// Render create item form
async function createItemGet(req, res) {
  const categoryId = req.query.category; // optional if creating from category page
  res.render("items/addToItem", { categoryId, errors: [], name: "", description: "", price: "", quantity: "" });
}

// Handle form submit
async function createItemPost(req, res) {
    const errors = validationResult(req);
  const { name, description, price, quantity, categoryId } = req.body;

  if (!errors.isEmpty()) {
    return res.status(400).render("items/addToItem", {
      errors: errors.array(),
      name,
      description,
      price,
      quantity,
      categoryId
    });
  }

  const safeName = escapeHtml(name);
  const safeDescription = escapeHtml(description);


  const item = await itemsModel.createItem(
    safeName,
    safeDescription,
    price,
    quantity,
    categoryId
  );

  res.redirect(`/categories/details/${categoryId}`);
}

async function itemDetailGet(req, res) {
  const id = req.params.id;

  const item = await itemsModel.getItemById(id);

  const category = await categoryModel.getCategoryById(item.category_id);


  res.render("items/details", { item, category });
}

// Render edit form
async function editItemGet(req, res) {
  const id = req.params.id;
  const item = await itemsModel.getItemById(id);

  res.render("items/editItem", { item, errors: [] });
}

// Handle edit submit
async function editItemPost(req, res) {
  const errors = validationResult(req);  
  const id = req.params.id;
  const { name, description, price, quantity, categoryId } = req.body;

  if (!errors.isEmpty()) {
    return res.status(400).render("items/editItem", {
      item: { id, name, description, price, quantity, categoryId },
      errors: errors.array()
    });
  }

  const safeName = escapeHtml(name);
  const safeDescription = escapeHtml(description);

  await itemsModel.updateItem(id, safeName, safeDescription, price, quantity, categoryId);

  res.redirect(`/items/${id}`);
}

async function deleteItemPost(req, res) {
  const id = req.params.id;

  const item = await itemsModel.getItemById(id);

  await itemsModel.deleteItem(id);

  res.redirect(`/categories/details/${item.category_id}`);
}

module.exports = {
  itemsByCategoryGet,
  createItemGet,
  createItemPost,
  itemDetailGet,
  editItemGet,
  editItemPost,
  deleteItemPost,
  validateItem
};
