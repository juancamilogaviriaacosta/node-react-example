import { gql } from '@apollo/client'

export const GET_PRODUCTOS = gql`
  query GetProductos {
    productos {
      id
      name
      price
      stock
    }
  }
`