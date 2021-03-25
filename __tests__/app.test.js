const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Order = require('../lib/models/Order.js');

jest.mock('../lib/utils/twilio.js');
const twilio = require('../lib/utils/twilio');


describe('03_separation-of-concerns-demo routes', () => {

  //add this to creates a new instance of an order so we can test it:
  

  beforeEach(() => {
    return setup(pool);
  });
  let order;
  beforeEach(async () => {
    order = await Order.insert({quantity: 10});
    twilio.sendSms.mockClear();
  });

  

  it('creates a new order in our database and sends a text message', () => {
    return request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 })
      .then(() => {
        expect(twilio.sendSms).toHaveBeenCalledTimes(1);
    
      });
  });

  // it('ASYNC/AWAIT: creates a new order in our database and sends a text message', async () => {
  //   const res = await request(app)
  //     .post('/api/v1/orders')
  //     .send({ quantity: 10 });

  //   expect(res.body).toEqual({
  //     id: '1',
  //     quantity: 10,
  //   });

  // });

  it('gets all orders from the database', async () => {
    
    //whats expected from the api
    const res = await request(app)
    .get(`/api/v1/orders`);
      
    expect(res.body).toEqual([order]);

  });

  //gets order by id
  it('gets and order by ID', async () => {
    
    const res = await request(app)
    .get(`/api/v1/orders/${order.id}`);
      
    expect(res.body).toEqual(order);

  });

  it('PUT updates an order', () => {
    return request(app)
    .put(`/api/v1/orders/${order.id}`)
    .send({quantity: 13})
    .then(()=> {expect(twilio.sendSms).toHaveBeenCalledTimes(1)});
  })
  it('DELETEs an order', () => {
    
    return request(app)
    .delete(`/api/v1/orders/${order.id}`)
    .then(()=> {expect(twilio.sendSms).toHaveBeenCalledTimes(1);
});
});
});
