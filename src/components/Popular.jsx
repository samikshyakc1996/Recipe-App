import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import {Splide,SplideSlide} from "@splidejs/react-splide"
import "@splidejs/splide/dist/css/splide.min.css";
import {Link} from "react-router-dom";
function Popular() {

    const [popular, setPopular]=useState([]);

    useEffect(()=>{
            getPopular();
    },[]);


    const getPopular =() =>{

        const check=localStorage.getItem('popular');
       
        
        if(check){
          setPopular(JSON.parse(check));
        }
        else{
          const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
          'X-RapidAPI-Key': 'a5d030be72mshaca62993d0bea56p10a0ccjsn08e2747df94d'
        }
      };
      
      fetch('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=9', options)
        .then(response => response.json())
        .then(response =>{
         localStorage.setItem('popular',JSON.stringify(response.recipes));
         
          setPopular(response.recipes);
        })
        .catch(err => console.error(err));

        }

      
    }
  return (
    <div>
   
        <Wrapper >
         <h3> Popular picks</h3>
         <Splide options={{
           perPage:2,
          
           pagination:false,
           drag:"free",
           gap:"5rem"
         }}>
         {popular.map((recipe)=>{
           return(
             
            
            <SplideSlide key={recipe.id}>
            <Card >
            <Link to={"/recipe/"+ recipe.id}>
               <p> {recipe.title}</p>
              <img src={recipe.image}  alt= {recipe.title} />
              <Gradient/>
              </Link>
            </Card>
            </SplideSlide>
            
           )
         })}
         </Splide>
        </Wrapper>
    </div>
  );
}

const Wrapper=styled.div
  `margin: 4rem 0rem;
  `;
const Card=styled.div`
   min-height:20rem;
   max-height:20rem;
   border-radius:2rem;
  
   overflow:hidden;

  img{
    border-radius:2rem;
    position:absolute;
    left:0;
    width:100%;
    height:100%;
    object-fit:cover;
  }

  p{
    position:absolute;
    z-index:10;
    left:50%;
    bottom:0%;
    transform:translate(-50%,0%);
    color:white;
    width:100%;
    text-align:center;
    font-weight:600;
    font-size:1rem;
    height:40%;
    display:flex;
    justify-content:center;
    align-items:center;
  }
  `;
  const Gradient=styled.div`
  z-index:3;
  position:absolute;
  width:100%;
  height:100%;
  background:linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5))
  `;


export default Popular;