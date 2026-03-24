import { gql } from '@apollo/client'

export const CREAR_PRODUCTO = gql`
  mutation CrearProducto($name: String, $price: Float, $stock: Int) {
    crearProducto(name: $name, price: $price, stock: $stock) {
      id
      name
      price
      stock
    }
  }
`