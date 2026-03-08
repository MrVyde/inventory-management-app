const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");



router.get("/categories/:id/items", itemController.itemsByCategoryGet);
router.get("/new", itemController.createItemGet);
router.post("/submit", itemController.validateItem, itemController.createItemPost);
router.get("/:id", itemController.itemDetailGet);
router.get("/:id/edit", itemController.editItemGet);
router.post("/:id/edit", itemController.validateItem, itemController.editItemPost);
router.post("/:id/delete", itemController.deleteItemPost);



module.exports = router;
