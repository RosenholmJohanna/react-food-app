import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FoodList = ({ meals }) => {
  return (
    <ul className="meal-list" >
      {meals.map((meal) => (
        <li key={meal.idMeal}>
          <Link to={`/meal-details/${meal.idMeal}`}>
          <div className="meal-card">
              <div>
                <h2>{meal.strMeal}</h2>
                <img src={meal.strMealThumb} alt={meal.strMeal} />
                <p>{meal.strArea}</p>
              </div>
          </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default FoodList;