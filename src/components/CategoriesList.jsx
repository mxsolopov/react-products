import React from "react";

function CategoriesList({ listId }) {

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

    return <datalist id={listId}>
        {categoriesList}
    </datalist>
}

export default CategoriesList;