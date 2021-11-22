import "./Table.css";
import React from "react";
import TableRow from "./TableRow";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CategoriesSelect from "./CategoriesSelect";

function Table({ products, editProductValues, deleteProduct, startDate, setStartDate, endDate, setEndDate, category, setCategory }) {

    let headTitles = ['Дата', 'Название', 'Категория', 'Цена', 'Действия'];

    function getSum() {
        let sum = 0;
        for (let product of products) {
            if (Date.parse(product.date) >= Date.parse(startDate) &&
                Date.parse(product.date) <= Date.parse(endDate) &&
                (category === "Все" || category === product.category)) {
                    sum = sum + +product.cost;
            }
        }
        return sum;
    }

    let content;

    if (products.length > 0) {
        content =
            <div className="table-wrapper">
                <div className="filters-wrapper">
                    <div className="categories">
                        <span className="filter-title">Категория:</span>
                        <CategoriesSelect category={category} setCategory={setCategory} />
                    </div>
                    <div className="date-picker">
                        <span className="filter-title">Период:</span>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            className="date-input"
                            dateFormat="dd.MM.yyyy"
                        />
                        <span className="divider">-</span>
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            className="date-input"
                            dateFormat="dd.MM.yyyy"
                        />
                    </div>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            {headTitles.map((item, index) => {
                                return <td key={index}>{item}</td>
                            })}
                        </tr>
                    </thead>

                    <tbody>
                        {
                            products.map((product, index) => {

                                if (Date.parse(product.date) >= Date.parse(startDate) &&
                                    Date.parse(product.date) <= Date.parse(endDate) &&
                                    (category === "Все" || category === product.category)) {

                                    return <TableRow
                                        key={index}
                                        product={product}
                                        editProductValues={editProductValues}
                                        deleteProduct={deleteProduct}
                                    />
                                } else {
                                    return <></>;
                                }
                            }
                            )
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={3}></td>
                            <td style={{paddingLeft: 8}}><strong>{getSum()}</strong> - сумма</td></tr>
                    </tfoot>
                </table>
            </div>
    } else {
        content = <div className="not-found-msg">Пока нет добавленных продуктов</div>;
    }

    return <>
        {content}
    </>;

}

export default Table;