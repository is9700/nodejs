const categoryController = require("../controller/category.controller");
const express = require("express");
const router = express.Router();
router.post("/",categoryController.create);
router.delete("/",categoryController.delete);
router.put("/",categoryController.update);
router.get("/",categoryController.find);
router.get("/:id",categoryController.findById);
module.exports = router ;