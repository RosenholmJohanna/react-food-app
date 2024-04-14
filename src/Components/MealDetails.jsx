import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { StyledListContainer } from "./FoodList";

const MealDetails = () => {
  const { idMeal } = useParams();
  const [mealDetails, setMealDetails] = useState({});

  useEffect(() => {
    const fetchMealDetails = async () => {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
      );
      if (!response.ok) {
        console.error("Error fetching meal details");
        return;
      }
      const data = await response.json();
      if (!data.meals || data.meals.length === 0) {
        console.error("Meal not found");
        return;
      }
      setMealDetails(data.meals[0]);
    };

    fetchMealDetails();
  }, [idMeal]);

  return (
    <StyledListContainer>
      <>
        <h2>{mealDetails.strMeal}</h2>
        <img src={mealDetails.strMealThumb} alt={mealDetails.strMeal} />
        <h2>Ingredients & measure:</h2>
        <ul>
          {Object.entries(mealDetails).map(([mealKey, ingredientValue]) => {
            if (mealKey.startsWith("strIngredient") && ingredientValue) {
              const ingredientNumber = mealKey.slice(13);
              const measureKey = `strMeasure${ingredientNumber}`;
              const measureValue = mealDetails[measureKey];
              return (
                <li mealKey={mealKey}>
                  {measureValue} {ingredientValue}
                </li>
              );
            }
          })}
        </ul>
        <h2>Instructions:</h2>
        <p>{mealDetails.strInstructions}</p>
      </>
    </StyledListContainer>
  );
};

export default MealDetails;

