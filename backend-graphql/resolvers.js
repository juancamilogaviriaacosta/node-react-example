import { pool } from './db.js';

export const resolvers = {
  Query: {
    products: async () => {
      const result = await pool.query('SELECT * FROM products');
      return result.rows;
    },
    product: async (_, { id }) => {
      const result = await pool.query(
        'SELECT * FROM products WHERE id = $1',
        [id]
      );
      return result.rows[0];
    },
    Mutation: {
      crearProducto: async (_, { name, price, stock }) => {
          const result = await pool.query(
          'INSERT INTO productos(name, price, stock) VALUES($1, $2, $3) RETURNING *',
          [name, price, stock]
          );
          return result.rows[0];
      },
    }
  },
};