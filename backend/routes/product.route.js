const router = require("express").Router();

const Controller = require("../controllers/product.controller");

router.route("/").get(Controller.getAll);
router.route("/:id").get(Controller.getById);

module.exports = router;
