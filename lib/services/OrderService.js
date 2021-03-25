const Order = require('../models/Order');
const { sendSms } = require('../utils/twilio');

module.exports = class OrderService {
  static async create({ quantity }) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `New Order received for ${quantity}`
    );

    const order = await Order.insert({ quantity });

    return order;
  }
  static async update(id, { quantity}) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Update order changed ${quantity}`
    );

    const order = await Order.updateOrderById({ id, quantity });

    return order;
  }
  static async deleteOrder(id, { quantity}) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Your order has been deleted ${quantity}`
    );

    const order = await Order.deleteOrder({ id, quantity });

    return order;
  }
};
