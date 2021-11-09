import './App.css';
import React, { useState } from "react";
import Form from './Form';
import Table from "./Table";

function App() {

  const [products, setProducts] = useState([]);

  function addProduct(prod) {
    setProducts([...products, prod]);
    saveCategory(prod["category"]);
  }

  function saveCategory(cat) {
    const categories = localStorage.getItem('categories');

    if (categories === null) {
      const firstCategory = JSON.stringify([cat]);
      localStorage.setItem('categories', firstCategory);
    } else {
      const savedCategories = JSON.parse(categories);
      savedCategories.push(cat);
      localStorage.setItem('categories', JSON.stringify(savedCategories));
    }
  }

  function editProductValue(editId, prop, value) {
    setProducts(products.map(product =>
      product.id === editId ? { ...product, [prop]: value } : product
    ));
  }

  function deleteProduct(id) {
    setProducts(
      products.filter(product => {
        if (product.id !== id) {
          return true;
        } else {
          return false;
        }
      })
    )
  }

  return <div className="container">
    <h1 className="title">Калькулятор продуктов</h1>
    <Form addProduct={addProduct} />
    <Table products={products} editProductValue={editProductValue} deleteProduct={deleteProduct} />
  </div>
}

export default App;
