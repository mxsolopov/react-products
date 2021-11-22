import "./Chart.css";
import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CategoriesSelect from "./CategoriesSelect";


function Chart({ products }) {

    function getWeekNum(date) {
        let currentdate = new Date(date);
        var oneJan = new Date(currentdate.getFullYear(), 0, 1);
        var numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
        var result = Math.ceil((currentdate.getDay() + 1 + numberOfDays) / 7);
        return result;
    }

    const [category, setCategory] = useState('Все');
    const [period, setPeriod] = useState("По дням");

    function getDataForGraph() {
        let data;

        if (period === "По дням") {
            data = [{ "date": products[0].date, "cost": 0, "category": products[0].category }];
            for (let product of products) {
                let similarDate = data.find(item => item.date === product.date && (item.category === product.category || category === "Все"));
                if (similarDate) {
                    similarDate.cost = +similarDate.cost + +product.cost;
                } else {
                    data.push({ "date": product.date, "cost": +product.cost, "category": product.category });
                }
            }
        } else if (period === "По неделям") {
            data = [{ "date": getWeekNum(products[0].date) + "/" + products[0].date.slice(0, 4), "cost": 0, "category": products[0].category }];
            for (let product of products) {
                let similarWeek = data.find(item => item.date === (getWeekNum(product.date) + "/" + product.date.slice(0, 4)) && (item.category === product.category || category === "Все"));
                if (similarWeek) {
                    similarWeek.cost = +similarWeek.cost + +product.cost;
                } else {
                    data.push({ "date": getWeekNum(product.date) + "/" + product.date.slice(0, 4), "cost": +product.cost, "category": product.category });
                }
            }
        } else if (period === "По месяцам") {
            data = [{ "date": products[0].date.slice(5, 7) + "/" + products[0].date.slice(0, 4), "cost": 0, "category": products[0].category }];
            for (let product of products) {
                let similarMonth = data.find(item => item.date === (product.date.slice(5, 7) + "/" + product.date.slice(0, 4)) && (item.category === product.category || category === "Все"));
                if (similarMonth) {
                    similarMonth.cost = +similarMonth.cost + +product.cost;
                } else {
                    data.push({ "date": product.date.slice(5, 7) + "/" + product.date.slice(0, 4), "cost": +product.cost, "category": product.category });
                }
            }
        } else if (period === "По годам") {
            data = [{ "date": products[0].date.slice(0, 4), "cost": 0, "category": products[0].category }];
            for (let product of products) {
                let similarYear = data.find(item => item.date === product.date.slice(0, 4) && (item.category === product.category || category === "Все"));
                if (similarYear) {
                    similarYear.cost = +similarYear.cost + +product.cost;
                } else {
                    data.push({ "date": product.date.slice(0, 4), "cost": +product.cost, "category": product.category });
                }
            }
        }
        if (category !== 'Все') {
            data = data.filter(item => item.category === category);
        }
        console.log(data);
        return data;
    }

    if (products.length > 0) {
        return <>
            <div className="chart-wrapper">
                <div className="chart-filters">
                    <div className="categories">
                        <span className="filter-title">Категория:</span>
                        <CategoriesSelect category={category} setCategory={setCategory} />
                    </div>
                    <div className="period">
                        <span className="filter-title">Период:</span>
                        <select value={period} onChange={event => setPeriod(event.target.value)}>
                            <option>По дням</option>
                            <option>По неделям</option>
                            <option>По месяцам</option>
                            <option>По годам</option>
                        </select>
                    </div>
                </div>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={getDataForGraph()}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                        barSize={20}
                    >
                        <XAxis dataKey="date" scale="point" padding={{ left: 10, right: 10 }} />
                        <YAxis domain={[0, 'dataMax']} allowDataOverflow={true} />
                        <Tooltip />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Bar dataKey="cost" fill="#8884d8" background={{ fill: '#eee' }} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    } else {
        return <></>
    }

}

export default Chart;