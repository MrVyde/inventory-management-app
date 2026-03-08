const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categoriesController");


router.get("/", categoriesController.getAllCategories);
router.get("/categories/new", categoriesController.createCategoryGet)
router.post("/submit", categoriesController.validateCategory, categoriesController.createCategoryPost)
router.get("/categories/details/:id", categoriesController.categoryDetail);
router.get("/categories/details/:id/edit", categoriesController.editCategoryGet);
router.post("/categories/details/:id", categoriesController.validateCategory, categoriesController.editCategoryPost);
router.post("/categories/:id/delete", categoriesController.deleteCategoryPost);

module.exports = router;