import React, {useState} from 'react'
import {Good, useAddProductMutation, useDeleteProductMutation, useGetGoodsQuery} from './redux'

function App() {

  const [count, setCount] = useState('')
  const [newProduct, setNewProduct] = useState('')

  const {data = [], isLoading} = useGetGoodsQuery(count)
  const [addProduct, { isError }] = useAddProductMutation()
  const [deleteProduct, { isError: isDeleteError }] = useDeleteProductMutation()


  if (isLoading) return <h1>Loading...</h1>;

  const handleAddProduct = async () => {
    if (!newProduct.trim()) return

    try {
      await addProduct({ name: newProduct }).unwrap()
      setNewProduct('')
    } catch (e) {
      console.error('Ошибка при добавлении товара:', e)
    }
  }

  const handleDeleteProduct = async (id: number) => {
    try {
      await deleteProduct(id).unwrap()
    } catch (e) {
      console.error('Ошибка при удалении товара:', e)
    }
  }
  return (
    <div>
      <div>
        <input
          type="text"
          value={newProduct}
          onChange={(e) => setNewProduct(e.target.value)}/>
        <button onClick={handleAddProduct}>Add product</button>
      </div>
      <select value={count} onChange={(e) => setCount(e.target.value)}>
        <option value="''">all</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      <div>
      </div>
      <ul>
        {data.map((item: Good) => (
          <li key={item.id} onClick={() => handleDeleteProduct(item.id)}>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;






