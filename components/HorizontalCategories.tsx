import React from 'react';

const HorizontalCategories = ({ categories, language, onCategorySelect }) => {
    return (
        <div className="horizontal-categories">
            {categories.map(category => {
                // Fix: The 'color' property does not exist on the Category type. The invalid style attribute has been removed from the div below.
                return (
                    <div key={category.id} className="horizontal-category" onClick={() => onCategorySelect(category.id)}>
                        <div className="horizontal-category-icon">
                            {category.icon}
                        </div>
                        <div className="horizontal-category-name">
                            {category.name[language]}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default HorizontalCategories;
