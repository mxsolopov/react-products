import "./Form.css";
import React, { useState } from "react";
import { nanoid } from 'nanoid';

function Form({ addProduct }) {

    const [product, setProduct] = useState(getInitProduct);


    function getInitProduct() {
        const now = new Date();

        return {
            id: nanoid(),
            date: `${now.getFullYear()}-${addZero(now.getMonth() + 1)}-${addZero(now.getDate())}`,
            name: '',
            category: '',
            cost: '',
            isEdit: false,
        }
    }


    function changeProduct(prop, event) {
        setProduct({ ...product, [prop]: event.target.value })
    }

    function addZero(num) {
        if (num < 10) {
            return '0' + num;
        } else {
            return num;
        }
    }

    return <div className="product-form">
        <input type="date" className="input" defaultValue={product.date} onChange={event => changeProduct("date", event)} />
        <input type="text" className="input" placeholder="Название" value={product.name} onChange={event => changeProduct("name", event)} />
        <input type="text" className="input" placeholder="Категория" value={product.category} onChange={event => changeProduct("category", event)} />
        <input type="number" className="input" placeholder="Цена" value={product.cost} onChange={event => changeProduct("cost", event)} />
        <button className="add-btn" onClick={() => {
            addProduct(product);
            setProduct(getInitProduct);
        }}>
            Добавить
        </button>
    </div>;

}

export default Form;