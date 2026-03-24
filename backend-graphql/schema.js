import { pool } from './db.js';

export const typeDefs = `#graphql
  type Producto {
    id: ID
    name: String
    price: Float
    stock: Int
  }

  type Query {
    productos: [Producto]
    producto(id: ID!): Producto
  }

  type Mutation {
    crearProducto(name: String, price: Float, stock: Int): Producto
  }
`;

export const resolvers = {
  Query: {
    productos: async () => {
      const result = await pool.query('SELECT * FROM products');
      return result.rows;
    },
    producto: async (_, { id }) => {
      const result = await pool.query(
        'SELECT * FROM products WHERE id = $1',
        [id]
      );
      return result.rows[0];
    },
  },
  Mutation: {
    crearProducto: async (_, { name, price, stock }) => {
      const result = await pool.query(
        'INSERT INTO products(name, price, stock) VALUES($1, $2, $3) RETURNING *',
        [name, price, stock]
      );
      return result.rows[0];
    },
  },
};


