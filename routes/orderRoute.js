const express = require("express");
const {
  postOrder,
  orderList,
  orderDetails,
  updateStatus,
  userOrders,
} = require("../controllers/orderController");
const router = express.Router();

router.post("/postorder", postOrder);
router.get("/orderlist", orderList);
router.get("/orderdetail/:id", orderDetails);
router.put("/updatestatus/:id", updateStatus);
router.get("/userorderlist/:userId", userOrders);

module.exports = router;
