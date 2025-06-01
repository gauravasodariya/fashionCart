const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const {
  createOrder,
  getUserOrders,
  getOrderDetails,
  getAllOrders,
  deleteOrder,
  updateOrderStatus,
} = require("../controllers/orderController");

router.post("/new/order", isAuthenticatedUser, createOrder);
router.get("/orders/user", isAuthenticatedUser, getUserOrders);
router.get("/order/:orderID", isAuthenticatedUser, getOrderDetails);
router.get(
  "/admin/orders",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAllOrders
);
router.delete(
  "/admin/order/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteOrder
);
router.put(
  "/admin/order/:orderId",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateOrderStatus
);

module.exports = router;
