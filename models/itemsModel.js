const pool = require("../pool");


// CREATE a new item
async function createItem(name, description, price, quantity, categoryId) {
  const result = await pool.query(
    `INSERT INTO items (name, description, price, quantity, category_id)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [name, description, price, quantity, categoryId]
  );

  return result.rows[0];
}


// READ all items
async function getAllItems() {
  const result = await pool.query(
    `SELECT items.*, categories.name AS category_name
     FROM items
     JOIN categories ON items.category_id = categories.id
     ORDER BY items.created_at DESC`
  );

  return result.rows;
}


// READ items by category
// (VERY IMPORTANT for your assignment)
async function getItemsByCategory(categoryId) {
  const result = await pool.query(
    `SELECT * FROM items
     WHERE category_id = $1
     ORDER BY name ASC`,
    [categoryId]
  );

  return result.rows;
}


// READ single item by id
async function getItemById(id) {
  const result = await pool.query(
    `SELECT items.*, categories.name AS category_name
     FROM items
     JOIN categories ON items.category_id = categories.id
     WHERE items.id = $1`,
    [id]
  );

  return result.rows[0];
}


// UPDATE item
async function updateItem(id, name, description, price, quantity, categoryId) {
  const result = await pool.query(
    `UPDATE items
     SET name = $1,
         description = $2,
         price = $3,
         quantity = $4,
         category_id = $5
     WHERE id = $6
     RETURNING *`,
    [name, description, price, quantity, categoryId, id]
  );

  return result.rows[0];
}


// DELETE item
async function deleteItem(id) {
  const result = await pool.query(
    `DELETE FROM items
     WHERE id = $1
     RETURNING *`,
    [id]
  );

  return result.rows[0];
}


module.exports = {
  createItem,
  getAllItems,
  getItemsByCategory,
  getItemById,
  updateItem,
  deleteItem,
};