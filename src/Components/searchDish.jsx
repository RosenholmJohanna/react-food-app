import React, { useEffect, useState, } from 'react'
import FoodList, { StyledListContainer } from './foodList';
import styled from 'styled-components';
// import { StyledListContainer } from './foodList';


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
    <StyledListContainer>
    <StyledSearchContainer>
      <label>
        Search dish
      </label>  
      <input
        type="text"
        value={searchMeal}
        onChange={(e) => setSearchMeal(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p>{error}</p>}

      <FoodList meals={meals} />
    </StyledSearchContainer>
    </StyledListContainer>
  );
};

export default SearchDish;

//  pass state variable "meals" to child as prop



const StyledSearchContainer = styled.div `
padding-top: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50px;
  background-color: #4E070C;
  color: black;
  /* margin: 0; */
`