const express = require("express");
const router = express.Router();
const orderController = require("../controller/OrderController");
const { VerifyToken } = require("../middleware/TokenGeneration");

// Create a new order
router.post("/", orderController.createOrder);

// Get all orders (with optional filters) - Admin only
router.get("/", orderController.getAllOrders);

// Get my orders (user-specific) - requires authentication
router.get("/my-orders", VerifyToken, orderController.getMyOrders);

// Get single order by ID
router.get("/:id", orderController.getOrderById);

// Update order status
router.put("/:id/status", orderController.updateOrderStatus);

// Cancel order
router.post("/:id/cancel", orderController.cancelOrder);

// Return order
router.post("/:id/return", orderController.returnOrder);

// Get order statistics
router.get("/stats/overview", orderController.getOrderStats);

module.exports = router;
