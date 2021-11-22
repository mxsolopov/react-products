import React from "react";

function CategoriesSelect({ category, setCategory }) {

    let categoriesList = "";

    const categories = localStorage.getItem("categories");

    if (categories !== null) {
        const categoriesArr = JSON.parse(categories);

        categoriesList = categoriesArr.map((category, index) => {
            return <option
                key={index}
                value={category}
            >
                {category}
            </option>
        });
    }

    return <select value={category} onChange={event => setCategory(event.target.value)}>
        <option value="Все">Все</option>
        {categoriesList}
    </select>
}

export default CategoriesSelect;