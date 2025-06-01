const Order = require('../models/Order');
const Product = require('../models/Product');

async function createOrder(req, res) {
  try {
    const { orderItems, shippingInfo, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;
    if (!orderItems || !orderItems.length) {
      return res.status(400).json({ success: false, message: 'Order items are required' });
    }
    if (!paymentInfo || !paymentInfo.id || !paymentInfo.status) {
      return res.status(400).json({ success: false, message: 'Payment info is required' });
    }
    const order = await Order.create({
      user: req.user._id,
      orderItems,
      shippingInfo,
      paymentInfo,
      paidAt: new Date(),
      itemPrice: itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      orderStatus: 'Processing',
    });
    res.status(201).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

async function getUserOrders(req, res) {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('orderItems.product', 'name price image')
      .sort({ createdAt: -1 });
    return res.status(200).json({ success: true, orders });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

async function getOrderDetails(req, res) {
  try {
    const order = await Order.findById(req.params.orderID)
      .populate('orderItems.product', 'name price image')
      .populate('user', 'name email');
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to view this order' });
    }
    return res.status(200).json({ success: true, order });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

async function getAllOrders(req, res) {
  try {
    const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
    const totalAmount = orders.reduce((acc, o) => acc + (o.totalPrice || 0), 0);
    return res.status(200).json({ success: true, orders, totalAmount });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

async function deleteOrder(req, res) {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    return res.status(200).json({ success: true, message: 'Order deleted' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

async function updateOrderStatus(req, res) {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    order.orderStatus = status || order.orderStatus;
    if (status === 'Delivered') {
      order.deliveredAt = new Date();
    }
    await order.save();
    return res.status(200).json({ success: true, order });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

module.exports = {
  createOrder,
  getUserOrders,
  getOrderDetails,
  getAllOrders,
  deleteOrder,
  updateOrderStatus,
};

