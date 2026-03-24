import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { CREAR_PRODUCTO } from '../graphql/mutations'
import { GET_PRODUCTOS } from '../graphql/queries'

export default function ProductForm() {
  const [form, setForm] = useState({
    name: '',
    price: 0,
    stock: 0,
  })

  const [crearProducto, { loading, error }] = useMutation(CREAR_PRODUCTO, {
    refetchQueries: [{ query: GET_PRODUCTOS }],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setForm({
      ...form,
      [name]: name === 'name' ? value : Number(value),
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await crearProducto({
      variables: form,
    })

    // limpiar formulario
    setForm({
      name: '',
      price: 0,
      stock: 0,
    })
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Crear Producto</h2>

      <input
        name="name"
        placeholder="Nombre"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="price"
        type="number"
        placeholder="Precio"
        value={form.price}
        onChange={handleChange}
      />

      <input
        name="stock"
        type="number"
        placeholder="Stock"
        value={form.stock}
        onChange={handleChange}
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Guardando...' : 'Crear'}
      </button>

      {error && <p>Error 😢</p>}
    </form>
  )
}