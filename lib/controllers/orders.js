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
  //lines 7-10 does the same as 11-17

//GET allorders variables points to the SQL query in Order.js
  .get('/', async (req, res, next) => {
    const allOrders = await Order.select();
    //Send all mapped instances of the new orders we returned in Order.js
    //sending all OrderService(rows) in orders select function
    res.send(allOrders);
  })

  .get('/:id', async (req, res, next) => {
    const oneOrder = await Order.selectId(req.params.id);
    res.send(oneOrder);
  })

  .put('/:id', async (req, res, next) => {
    try {
      const order = await OrderService.update(req.params.id, req.body);
      res.send(order);
    } catch (err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const order = await OrderService.deleteOrder(req.params.id, req.body);
      res.send(order);
    } catch (err) {
      next(err);
    }
  });

//   jest.mock('../lib/utils/twilio.js');
// const twilio = require('../lib/utils/twilio');

// describe('endpoints', () => {
//   beforeEach(() => {
//     return setup(pool);
//   });

//   let order;
//   beforeEach(async () => {
//     order = await Order.insert({ quantity: 10 });

//     twilio.sendSms.mockClear();
//   });

//   it('sends a sms upon new order', () => {
//     return request(app)
//       .post('/api/v1/orders')
//       .send({ quantity: 10 })
//       .then(() => {
//         expect(twilio.sendSms).toHaveBeenCalledTimes(1);
//       });
//   });

//   it('sends a sms upon deleted order', () => {
//     return request(app)
//       .delete('/api/v1/orders/1')
//       .then(() => {
//         expect(twilio.sendSms).toHaveBeenCalledTimes(1);
//       });
//   });

