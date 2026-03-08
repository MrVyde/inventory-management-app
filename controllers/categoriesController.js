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
const validateCategory = [
  body("name")
    .trim()
    .notEmpty().withMessage("Category name is required.")
    .isLength({ max: 100 }).withMessage("Category name must be at most 100 characters."),
  body("description")
    .trim()
    .isLength({ max: 500 }).withMessage("Description must be at most 500 characters.")
];


async function getAllCategories(req, res) {
  const categories = await categoryModel.getAllCategories();
  res.render("index", { categories });
}

async function createCategoryGet(req, res) {
 res.render("categories/addToCategory", { errors: [], name: "", description: "" })
}

async function createCategoryPost(req, res) {
  const { name, description } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("categories/addToCategory", {
      errors: errors.array(), // pass raw objects so you can use err.msg in partial
      name,
      description
    });
  }

  const safeName = escapeHtml(name);
  const safeDescription = escapeHtml(description);

  await categoryModel.createCategory(safeName, safeDescription);

  res.redirect("/")
}

async function categoryDetail(req, res) {
  const id = req.params.id;

  const category = await categoryModel.getCategoryById(id);
  const items = await categoryModel.getItemsByCategoryId(id);

  res.render("categories/details", {
    category,
    items,
  });
}

// Render edit form
async function editCategoryGet(req, res) {
  const category = await categoryModel.getCategoryById(req.params.id);

  res.render("categories/editCategory", { category, errors: [] });
}


// Handle update submit
async function editCategoryPost(req, res) {
  const errors = validationResult(req);
  const { name, description } = req.body;
  const id = req.params.id;

  if (!errors.isEmpty()) {
    return res.status(400).render("categories/editCategory", {
      category: { id, name, description },
      errors: errors.array()
    });
  }

  const safeName = escapeHtml(name);
  const safeDescription = escapeHtml(description);

  await categoryModel.updateCategory(id, safeName, safeDescription);

  res.redirect(`/categories/details/${id}`);
}


async function deleteCategoryPost(req, res) {
  const id = req.params.id;

  await categoryModel.deleteCategory(id);

  res.redirect("/");
}


module.exports = {
  getAllCategories,
  createCategoryGet,
  createCategoryPost,
  categoryDetail,
  editCategoryGet,
  editCategoryPost,
  deleteCategoryPost,
  validateCategory
};