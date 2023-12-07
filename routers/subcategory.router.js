const express = require("express");
const subcategoryController = require("../controller/subcategory.controller");
const router = express.Router();
router.post("/",subcategoryController.create);
router.delete("/",subcategoryController.delete);
router.put("/:id",subcategoryController.update);
router.get("/",subcategoryController.find);
router.get("/:id",subcategoryController.findById);
module.exports = router ; 