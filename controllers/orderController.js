const OrderItem = require("../models/orderitemModel");
const Order = require("../models/orderModel");

// //post order
exports.postOrder = async (req, res) => {
  try {
    // Create order items and get their IDs
    const orderItemIds = await Promise.all(
      req.body.orderItems.map(async (orderItem) => {
        let newOrderItem = new OrderItem({
          quantity: orderItem.quantity,
          product: orderItem.product,
        });
        newOrderItem = await newOrderItem.save();
        return newOrderItem._id;
      })
    );
    console.log(orderItemIds);

    // Calculate total price
    const totalAmount = await Promise.all(
      orderItemIds.map(async (orderId) => {
        const itemOrder = await OrderItem.findById(orderId).populate(
          "product",
          "price"
        );
        const total = itemOrder.quantity * itemOrder.product.price;
        return total;
      })
    );

    const totalPrice = totalAmount.reduce((acc, curr) => acc + curr, 0);

    // Create and save the order
    let order = new Order({
      orderItems: orderItemIds,
      shippingAddress1: req.body.shippingAddress1,
      shippingAddress2: req.body.shippingAddress2,
      city: req.body.city,
      zip: req.body.zip,
      country: req.body.country,
      phone: req.body.phone,
      totalPrice: totalPrice,
      user: req.body.user,
    });

    order = await order.save();

    if (!order) {
      return res.status(400).json({ error: "Failed to create order" });
    }

    res.status(201).send(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//order list
exports.orderList = async (req, res) => {
  try {
    const order = await Order.find()
      .populate("user", "name")
      .sort({ createdAt: -1 });
    if (!order) {
      return res.status(400).json({ error: "Something went wrong" });
    }
    res.send(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//order details

exports.orderDetails = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name")
      .populate({
        path: "orderItems",
        populate: {
          path: "product",
          populate: "category",
        },
      });
    if (!order) {
      res.status(400).json({ error: "Something went wrong" });
    }
    res.send(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//update status

exports.updateStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!order) {
      res.status(400).json({ error: "Something went wrong" });
    }
    res.send(order);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

//orderlist of specific user

exports.userOrders = async (req, res) => {
  try {
    const userOrderList = await Order.find({ user: req.params.userId })
      .populate({
        path: "orderItems",
        populate: {
          path: "product",
          populate: "category",
        },
      })
      .sort({ createdAt: -1 });
    if (!userOrderList) {
      return res.status(400).json({ error: "Something went wrong" });
    }
    res.send(userOrderList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
