import { useQuery } from '@apollo/client/react'
import { GET_PRODUCTOS } from './graphql/queries'
import type { Producto } from './types/product'
import ProductForm from './components/ProductForm'


interface GetProductosResponse {
  productos: Producto[]
}

function App() {
  const { data, loading, error } = useQuery<GetProductosResponse>(GET_PRODUCTOS)

  if (loading) return <p>Cargando...</p>

  if (error) {
    console.error(error)
    return <p>Error 😢</p>
  }

  return (
    <div className="container">
      <h1>Productos</h1>

      <ProductForm />

      <div className="product-list">
        {data?.productos.map((p) => (
          <div className="product-card" key={p.id}>
            <h3>{p.name}</h3>
            <p>Precio: ${p.price}</p>
            <p>Stock: {p.stock}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App