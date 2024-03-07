import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const DisplayFood = () => {
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
          if (data.meals && data.meals.length > 0) {
            setMealDetails(data.meals[0]);
            setError(null);
          } else {
            setMealDetails({});
           
          }
        } else {
          setMealDetails({});
          setError('Error fetching meal details');
        }
      } catch (err) {
        setMealDetails({});
        setError('Error fetching meal details (catch)');
      }
    };

    fetchMealDetails();
  }, [idMeal]);


  return (
    <div>
      <h2>Meal Details</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          <p>{mealDetails.strMeal}</p>
          <img
            src={mealDetails.strMealThumb}
            alt={mealDetails.strMeal} />
          <p>{mealDetails.strInstructions}</p>
        </>
      )}
    </div>
  );
};

export default DisplayFood;