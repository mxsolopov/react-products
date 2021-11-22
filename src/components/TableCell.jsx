import React from 'react';
import "./TableCell.css"

function TableCell({ editState, type, product, editedProductValues, setEditedProductValues, value, formattedDate }) {

    return (
        <td className="cell">
            {editState ?
                <input
                    type={type}
                    value={editedProductValues[value]}
                    onChange={(event) => {
                        const copy = Object.assign({}, editedProductValues);
                        copy[value] = event.target.value;
                        setEditedProductValues(copy);
                    }}
                // onBlur={() => editProductValue(product.id, value, inputValue)}
                /> :
                formattedDate ? formattedDate : product[value]}
        </td>
    )
}

export default TableCell;
