const router = require("express").Router();

const Controller = require("../controllers/product.controller");

router.route("/").get(Controller.getAll).post(Controller.createProduct);
router.route("/:id").get(Controller.getById);
router.route("/:id/update").put(Controller.updateProduct);
router.route("/:id/delete").delete(Controller.deleteProduct);

module.exports = router;
