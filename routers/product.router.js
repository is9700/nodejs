const productController = require("../controller/product.controller");
const express = require("express");
const router = express.Router();
router.post("/",productController.create);
router.delete("/",productController.delete);
router.put("/",productController.update);
router.get("/",productController.find);
router.get("/:id",productController.findById);
module.exports = router ;