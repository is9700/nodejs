const orderController = require("../controller/order.controller");
const express = require("express");
const router = express.Router();
router.post("/",orderController.create);
router.delete("/",orderController.delete);
router.put("/",orderController.update);
router.get("/",orderController.find);
router.get("/:id",orderController.findById);
module.exports = router ;