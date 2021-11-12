import './App.css';
import React, { useState } from "react";
import Form from './Form';
import Table from "./Table";

function App() {

  const [products, setProducts] = useState([]);

  const now = new Date();

  const [startDate, setStartDate] = useState(new Date(`${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`));
  const [endDate, setEndDate] = useState(new Date(`${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`));

  const [category, setCategory] = useState('Все');

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
      const checkExist = savedCategories.some(savedCategory => {
        if (savedCategory.toLowerCase() === cat.toLowerCase()) {
          return true;
        } else {
          return false;
        }
      });
      if (!checkExist) {
        savedCategories.push(cat);
        localStorage.setItem('categories', JSON.stringify(savedCategories));
      }
    }
  }

  function editProductValues(editId, date, name, category, cost) {
    setProducts(products.map(product => {
        if (product.id === editId) {
          return { ...product, "date": date, "name": name, "category": category, "cost": cost, "isEdit": !product.isEdit }
        } else {
          return product;
        }
      }
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
    <Table products={products} editProductValues={editProductValues} deleteProduct={deleteProduct} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} category={category} setCategory={setCategory} />
  </div>
}

export default App;
