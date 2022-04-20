import React from 'react'
import {useEffect, useState} from "react";
import {useParams,Link} from 'react-router-dom';
import styled from "styled-components";


function Searched() {

    const [searchedRecipes, setSearchedRecipes]=useState([]);
    let params=useParams();
    const getSearched=(name)=>{
      // const check=localStorage.getItem('searchedRecipes');
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
          'X-RapidAPI-Key': 'a5d030be72mshaca62993d0bea56p10a0ccjsn08e2747df94d'
        }
      };
      
      fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?instructionsRequired=true&addRecipeInformation=true&number=10&query=${name}`, options)
        .then(response => response.json())
        .then(response => {
          
          setSearchedRecipes(response.results);
        })
        .catch(err => console.error(err));
    };
    useEffect(()=>{
      
        getSearched(params.search);
    },[params.search]);
    
  return (
    <Grid>
        {searchedRecipes.map((item)=>{
          return(
            <Card key={item.id}>
            <Link to={"/recipe/"+item.id}>
              <img src={item.image} alt={item.title}/>
              <h4>{item.title}</h4>
              </Link>
            </Card>
          )
        })}
    </Grid>
  )
}
const Grid= styled.div`
display: grid;
grid-template-columns:repeat(auto-fit, minmax(20rem,1fr));
grid-gap: 3rem;
`;

const Card=styled.div`
img{
  width: 100%;
  border-radius: 2rem;
}
a{
  text-decoration: none;
}
h4{
  text-align: center;
  padding: 1rem;
}
`;
export default Searched