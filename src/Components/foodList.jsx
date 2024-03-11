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
                <Tag>{meal.strArea}</Tag>
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
  margin: 0%;
  margin-top: 5%;
  background-color: #e8e2dd;
  border-radius: 50px 50px 5px 5px; 

img{
  max-width: 80%;
    height: auto;
    border-radius: 4px;
    margin-bottom: 10px;
}
`

const StyledListItem = styled.li `
margin: 10px;
`

const StyledList = styled.ul `
 list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const Tag = styled.div `
font-size: 0.7em;
background-color: #FF670E;
width: 20%;
margin: 1%;
border-radius: 5px 5px 5px 5px;

`