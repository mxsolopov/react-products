import "./Table.css";
import React from "react";
import TableRow from "./TableRow";

function Table({ products, setEditState, editProductValue }) {

    let content;

    if (products.length > 0) {
        content = <table className="table">
            <thead>
                <tr>
                    <td>Дата</td>
                    <td>Название</td>
                    <td>Категория</td>
                    <td>Цена</td>
                    <td>Действия</td>
                </tr>
            </thead>

            <tbody>
                {
                    products.map((product, index) => <TableRow key={index} product={product} setEditState={setEditState} editProductValue={editProductValue}/> )
                }
            </tbody>
        </table>
    } else {
        content = <div className="not-found-msg">Пока нет добавленных продуктов</div>;
    }

    return <>
        {content}
    </>;

}

export default Table;