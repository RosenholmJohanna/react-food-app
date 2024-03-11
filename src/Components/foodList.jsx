import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FoodList = ({ meals }) => {
  return (
    <StyledListContainer>
    <StyledList >
      {meals.map((meal) => (
        <StyledListItem key={meal.idMeal}>
          <Link to={`/meal-details/${meal.idMeal}`}>
          <div className="meal-card">
              <div>
                <h2>{meal.strMeal}</h2>
                <img src={meal.strMealThumb} alt={meal.strMeal} />
                <p>{meal.strArea}</p>
              </div>
          </div>
          </Link>
        </StyledListItem>
      ))}
    </StyledList>
  </StyledListContainer>
  );
};

export default FoodList;




export const StyledListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;

img{
  max-width: 90%;
    height: auto;
    border-radius: 4px;
    margin-bottom: 10px;
}
`

const StyledListItem = styled.li `
background-color: aliceblue;
margin: 10px;
`

const StyledList = styled.ul `
 list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`
