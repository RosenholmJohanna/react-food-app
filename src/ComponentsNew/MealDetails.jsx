import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StyledListContainer } from "./FoodList";
import RateMeal from "./RateMeal";

const MealDetails = () => {
  const { idMeal } = useParams();
  const [mealDetails, setMealDetails] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);

          if (data.meals && data.meals.length > 0) {
            setMealDetails(data.meals[0]);

            setError(null);
          } else {
            setMealDetails({});
            setError(null);
          }
        } else {
          setMealDetails({});
          setError("error fetching meal details");
        }
      } catch (err) {
        setMealDetails({});
        setError("error fetching meal details at catch");
      }
    };

    fetchMealDetails();
  }, [idMeal]);

  return (
    <StyledListContainer>
      <h2>Meal Details</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          <p>{mealDetails.strMeal}</p>
          <img src={mealDetails.strMealThumb} alt={mealDetails.strMeal} />
        </>
      )}
      <RateMeal dishId={idMeal} />
      <h2>Ingredients & measure:</h2>
      <ul>
        {Object.entries(mealDetails).map(([key, ingredientValue]) => {
          if (key.startsWith("strIngredient") && ingredientValue) {
            const ingredientNumber = key.slice(13);
            const measureKey = `strMeasure${ingredientNumber}`;
            const measureValue = mealDetails[measureKey];

            return (
              <li key={key}>
                {measureValue} {ingredientValue}
              </li>
            );
          }
        })}
      </ul>
      <h2>Instructions:</h2>
      <p>{mealDetails.strInstructions}</p>
    </StyledListContainer>
  );
};

export default MealDetails;
