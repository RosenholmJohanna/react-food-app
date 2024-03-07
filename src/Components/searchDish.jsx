import React, { useEffect, useState, } from 'react'
import FoodList from './foodList';
import styled from 'styled-components';


const SearchDish = () => {
  const [searchMeal, setSearchMeal] = useState('');
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);
 


  const handleSearch = async () => {
    try {
      const response = await fetch(
        // by first letter "a"
        // `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchLetter}`
        
        // by meal search "chicken"
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchMeal}`
      );
      if (response.ok) {
        const data = await response.json();
        if (data.meals) {
          setMeals(data.meals);
          setError(null);
        } else {
          setMeals([]);
          setError('No meals found... please try search for something else');
        }

      } else {
        setMeals([]);
        setError('Error fetching data. Please try again.');
      }
    } catch (err) {
      setMeals([]);
      setError('Error fetching data. Please try again.');
    }
  };

  return (
    <div>
      <label>
        Search by meal:
        <input
          type="text"
          value={searchMeal}
          onChange={(e) => setSearchMeal(e.target.value)} />
      </label>
      <button onClick={handleSearch}>Search</button>

      {error && <p>{error}</p>}

      <FoodList meals={meals} />
    </div>
  );
};

export default SearchDish;

//  pass state variable "meals" to child as prop