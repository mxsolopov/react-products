import "./TableRow.css";
import React, { useState } from "react";
import TableCell from "./TableCell";

function TableRow({ product, editProductValues, deleteProduct }) {

    function getInitEditedProductValues() {
        return {
            date: product.date,
            name: product.name,
            category: product.category,
            cost: product.cost,
        }
    }

    const [editedProductValues, setEditedProductValues] = useState(getInitEditedProductValues());

    const formattedDate = product.date.split("-").reverse().join(".");

    return <tr className="table-row">
        <TableCell editState={product.isEdit} type={"date"} product={product} editedProductValues={editedProductValues} setEditedProductValues={setEditedProductValues} value={"date"} formattedDate={formattedDate} />
        <TableCell editState={product.isEdit} type={"text"} product={product} editedProductValues={editedProductValues} setEditedProductValues={setEditedProductValues} value={"name"} />
        <TableCell editState={product.isEdit} type={"text"} product={product} editedProductValues={editedProductValues} setEditedProductValues={setEditedProductValues} value={"category"} />
        <TableCell editState={product.isEdit} type={"number"} product={product} editedProductValues={editedProductValues} setEditedProductValues={setEditedProductValues} value={"cost"} />

        <td className="head-action">
            <button
                className="edit-btn"
                onClick={() => {
                    editProductValues(product.id, editedProductValues.date, editedProductValues.name, editedProductValues.category, editedProductValues.cost);
                }}
            >
                {product.isEdit ? "сохранить" : "изменить"}
            </button>
            <button
                className="del-btn"
                onClick={() => deleteProduct(product.id)}
            >
                удалить
            </button>
        </td>
    </tr >;

}

export default TableRow;