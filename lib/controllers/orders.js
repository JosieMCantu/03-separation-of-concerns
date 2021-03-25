const { Router } = require('express');
const OrderService = require('../services/OrderService');
const Order = require('../models/Order')

module.exports = Router()
  .post('/', async (req, res, next) => {
    // OrderService
    //   .create(req.body)
    //   .then(order => res.send(order))
    //   .catch(next);
    try {
      const order = await OrderService.create(req.body);
      res.send(order);
    } catch (err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    const allOrders = await Order.select();
    res.send(allOrders);
  })

  .get('/:id', async (req, res, next) => {
    const oneOrder = await Order.selectId(req.params.id);
    res.send(oneOrder);
  })

  .put('/:id', async (req, res, next) => {
    //Orderservice
  })
  .delete('/:id', async (req, res, next) => {
    //Orderservice
  });

