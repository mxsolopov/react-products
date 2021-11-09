import "./TableRow.css";
import React from "react";

function TableRow({ product, setEditState, editProductValue }) {

    return <tr className="table-row">
        <td className="head-item">
            {product.isEdit ? 
                <input type="date"
                        value={product.date}
                        onChange={(event) => editProductValue(product.id, "date", event.target.value)}/> :  
                    product.date}
        </td>
        <td className="head-item">
            {product.isEdit ? 
                <input
                    type="text"
                    value={product.name}
                    onChange={(event) => editProductValue(product.id, "name", event.target.value)} /> :
                    product.name}
        </td>
        <td className="head-item">
            {product.isEdit ?
                <input
                    type="text"
                    value={product.category}
                    onChange={(event) => editProductValue(product.id, "category", event.target.value)} /> :
                    product.category}
        </td>
        <td className="head-item">
            {product.isEdit ?
                <input
                    type="number"
                    value={product.cost}
                    onChange={(event) => editProductValue(product.id, "cost", event.target.value)}
                    /> :
                    product.cost}
        </td>
        <td className="head-action">
            <button 
                className="edit-btn"
                onClick={() => setEditState(product.id)}
            >
                {product.isEdit ? "сохранить" : "изменить"}
            </button>
            <button className="del-btn">удалить</button>
        </td>
    </tr>;

}

export default TableRow;