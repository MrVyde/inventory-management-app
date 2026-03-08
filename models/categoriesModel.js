const pool = require("../pool"); 



// CREATE a new category
async function createCategory(name, description) {
  const result = await pool.query(
    `INSERT INTO categories (name, description)
     VALUES ($1, $2)
     RETURNING *`,
    [name, description]
  );
  return result.rows[0];
}


// READ all categories
async function getAllCategories() {
  const result = await pool.query(
    `SELECT * FROM categories
     ORDER BY name ASC`
  );
  return result.rows;
}


// READ a single category by id
async function getCategoryById(id) {
  const result = await pool.query(
    `SELECT * FROM categories
     WHERE id = $1`,
    [id]
  );
  return result.rows[0]; // return single object
}

// READ a single category by id & items
async function getItemsByCategoryId(categoryId) {
  const result = await pool.query(
    `SELECT id, name, description, price, quantity
     FROM items
     WHERE category_id = $1`,
    [categoryId]
  );

  return result.rows;
}


// UPDATE a category by id
async function updateCategory(id, name, description) {
  const result = await pool.query(
    `UPDATE categories
     SET name = $1,
         description = $2
     WHERE id = $3
     RETURNING *`,
    [name, description, id]
  );
  return result.rows[0];
}


// DELETE a category by id
async function deleteCategory(id) {
  const result = await pool.query(
    `DELETE FROM categories
     WHERE id = $1
     RETURNING *`,
    [id]
  );
  return result.rows[0];
}


// EXPORT FUNCTIONS
module.exports = {
  createCategory,
  getAllCategories,
  getItemsByCategoryId,
  getCategoryById,
  updateCategory,
  deleteCategory,
};