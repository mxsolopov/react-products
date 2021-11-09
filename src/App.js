import './App.css';
import React, {useState} from "react";
import Form from './Form';
import Table from "./Table";

function App() {

  const [products, setProducts] = useState([]);

  function addProduct(prod) {
		setProducts([...products, prod]);
	}

  function setEditState(editId) {
    setProducts(products.map(product =>
			product.id === editId ? {...product, isEdit: !product.isEdit} : product
		));
  }

  function editProductValue(editId, prop, value) {
    setProducts(products.map(product =>
			product.id === editId ? {...product, [prop]: value} : product
		));
  }

  return <div className="container">
    <h1 className="title">Калькулятор продуктов</h1>
    <Form addProduct={addProduct} />
    <Table products={products} setEditState={setEditState} editProductValue={editProductValue}/>
  </div>
}

export default App;
