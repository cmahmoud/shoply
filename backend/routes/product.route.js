const router = require("express").Router();

const Controller = require("../controllers/product.controller");

router.route("/").get(Controller.getAll);
router.route("/:id").get(Controller.getById);
router.route("/:id/delete").delete(Controller.deleteProduct);

module.exports = router;
