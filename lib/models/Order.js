const pool = require('../utils/pool');

// static methods -> Order.insert(): Math.random(), Number.parseInt(), JSON.stringify()
// instance methods -> arr.map(), params.get('code')
module.exports = class Order {
  id;
  quantity;

  constructor(row) {
    this.id = row.id;
    this.quantity = row.quantity;
  }

  static async insert(order) {
    const {
      rows,
    } = await pool.query(
      'INSERT INTO orders (quantity) VALUES ($1) RETURNING *',
      [order.quantity]
    );

    return new Order(rows[0]);
  }
//select all orders from the get endpoint
  static async select() {
    //select all columns/data from orders table
    const {
      rows,
    } = await pool.query(
      `SELECT *
      FROM orders`);
      //map through array of rows and for each row create a new instance of the Order class
    return rows.map(row => new Order(row));

    }
//select by ID
  static async selectId(id) {
    const {
      rows,
    } = await pool.query(
        `SELECT *
        FROM orders
        WHERE id=$1`, [id]);
    return new Order(rows[0]);
      }

    static async updateOrderById({id, quantity}) {
      const {
          rows,
        } = await pool.query(
          `UPDATE orders
          SET quantity = $1
          WHERE id = $2
          RETURNING *`, [quantity, id]);

      return new Order(rows[0]);
        }

    static async deleteOrder({id}) {
      const {
          rows,
        } = await pool.query(
          `DELETE from orders
          WHERE id = $1
          RETURNING *`, [id]);
  
      return new Order(rows[0]);
        }
};


