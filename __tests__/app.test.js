const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Order = require('../lib/models/Order.js');

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn(),
  },
}));

describe('03_separation-of-concerns-demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new order in our database and sends a text message', () => {
    return request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 })
      .then((res) => {
        // expect(createMessage).toHaveBeenCalledTimes(1);
        expect(res.body).toEqual({
          id: '1',
          quantity: 10,
        });
      });
  });

  it('ASYNC/AWAIT: creates a new order in our database and sends a text message', async () => {
    const res = await request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 });

    expect(res.body).toEqual({
      id: '1',
      quantity: 10,
    });

  });

  it('gets all orders from the database', async () => {
    await Order.insert({quantity : 20})
    
    const expectation = [
      {
        id: '1',
        quantity: 20
      }
    ];
    const res = await request(app)
    .get(`/api/v1/orders`);
      
    expect(res.body).toEqual(expectation);

  });

  it('gets and order by ID', async () => {
    const order = await Order.insert({quantity : 20})
    
    const expectation = {
      id: '1',
      quantity: 20
    }
    const res = await request(app)
    .get(`/api/v1/orders/${order.id}`);
      
    expect(res.body).toEqual(expectation);

  });

  it('PUT updates an order', async () => {
    const order = await Order.insert({quantity : 16})

    return request(app)
    .put(`/api/v1/orders/${order.id}`)
    .send({quantity: 13})
    .then((res)=> {
      expect(res.body).toEqual({
       id: order.id,
       quantity:13
      });
  
  });
  })
  it('DELETEs an order', async () => {
    const order = await Order.insert({quantity : 16})

    return request(app)
    .delete(`/api/v1/orders/${order.id}`)
    .then((res)=> {
      expect(res.body).toEqual({
        id: '1',
        quantity: 16
      });
});
});
});
