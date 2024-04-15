import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FoodList from "./FoodList";
import { StyledListContainer } from "./FoodList";

const SearchMeal = () => {
  const [searchMeal, setSearchMeal] = useState("");
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchMeal}`,
        console.log("fetch")
      );
      if (response.ok) {
        const data = await response.json();
        if (data.meals) {
          setMeals(data.meals);
          setError(null);
        } else {
          setMeals([]);
          setError(
            "could not find meal, try search for another meal like chicken?"
          );
        }
      } else {
        setMeals([]);
        setError("error fetching data");
      }
    } catch (err) {
      setMeals([]);
      setError("error fetch dat at catch.");
    }
  };

  return (
    <StyledListContainer>
      <StyledSearchContainer>
        <label>Search dish</label>
        <input
          type="text"
          value={searchMeal}
          onChange={(e) => setSearchMeal(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>

        <ErrorMessage>{error && <p>{error}</p>}</ErrorMessage>

        <FoodList meals={meals} />
      </StyledSearchContainer>
    </StyledListContainer>
  );
};

export default SearchMeal;

const StyledSearchContainer = styled.div`
  padding-top: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50px;
  background-color: #4e070c;
  color: white;
`;

const ErrorMessage = styled.div`
  color: white;
  font-size: small;
  margin-top: 5%;
`;
