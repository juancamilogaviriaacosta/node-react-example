export interface Producto {
  id: string
  name: string
  price: number
  stock: number
}

export interface CrearProductoInput {
  name: string
  price: number
  stock: number
}