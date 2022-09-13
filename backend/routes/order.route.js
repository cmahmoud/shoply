const router = require("express").Router();
const Controller = require("../controllers/order.controller");

router.route("/myorders").get(Controller.getMyOrders);
router.route("/:id").get(Controller.getOrder);
router.route("/:id/pay").put(Controller.payOrder);
router.route("/").post(Controller.orderItems);
module.exports = router;
