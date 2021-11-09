import "./CategoriesList.css";
import React from "react";

function CategoriesList({ product, categoriesEnabled, setCategoriesEnabled, changeProductFromList }) {

    let categoriesList = "";
    let listClass = "category-list";

    if (categoriesEnabled) {
        const categories = localStorage.getItem("categories");
        if (categories !== null) {
            listClass = "category-list show-borders";
            const categoriesArr = JSON.parse(categories);

            const filteredCategories = categoriesArr.filter(category => {
                return category.toLowerCase().includes(product.category.toLowerCase());
              })

            categoriesList = filteredCategories.map((category, index) => {
                return <li
                            key={index}
                            className="category-list-item"
                            onClick={() => {
                                changeProductFromList("category", category);
                                setCategoriesEnabled(false);
                            }}
                        >
                            {category}
                        </li>
            });
        }

    }

    return <ul className={listClass}>
        {categoriesList}
    </ul>
}

export default CategoriesList;