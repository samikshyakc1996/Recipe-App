import { useState, useEffect } from 'react'
import styled from "styled-components"
import { useParams } from 'react-router-dom'
import React from 'react'

function Recipe() {
    let params=useParams();
    const [details,setDetails]=useState({});
    const [activeTab, setActiveTab]=useState("instructions");

    const fetchDetails=()=>{
      
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
                'X-RapidAPI-Key': 'a5d030be72mshaca62993d0bea56p10a0ccjsn08e2747df94d'
            }
        };
        
        fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${params.name}/information`, options)
            .then(response => response.json())
            .then(response =>{
               
              
                setDetails(response);
            })
            .catch(err => console.error(err));
    }
    useEffect(()=>{
        fetchDetails();
    },[params.name])

    
  return (
      <>
    <DetailWrapper>
        <div>
            <h2>{details.title}</h2>
            <img src={details.image} alt={details.title} />
        </div>
        <Info>
            <Button className={activeTab=== "instructions" ? "active" : ""} onClick={()=> setActiveTab("instructions")}>Instructions</Button>
            <Button className={activeTab=== "ingredients" ? "active":""} onClick={()=> setActiveTab("ingredients")}>Ingredients</Button>
      
       {activeTab==="instructions" && (
        <div>
            <h3 dangerouslySetInnerHTML={{__html:details.summary}}></h3>
            <h3 dangerouslySetInnerHTML={{__html:details.instructions}}></h3>
        </div>
       )}
        {activeTab==="ingredients" && (
        <ul>
        
            {details.extendedIngredients.map((ingredient)=>(
            <li key={ingredient.id}>{ingredient.original}</li>
            ))}
        </ul>
        )};
        </Info>
    </DetailWrapper>
   
    </>
  )
}


const DetailWrapper=styled.div`
margin-top:10rem;
margin-bottom:5rem;
display:flex;

.active{
    background:linear-gradient(35deg,#494949, #313131);
    color:white;
}

h2{
    margin-bottom:2rem;
}
li{
    font-size:1.2rem;
    line-height:2.5rem;
}
ul{
    margin-top:2rem;
}

`;

const Button=styled.button`
padding:1rem 2rem;
color:#3131 31;
background:white;
border:2px solid black;
margin-right:2rem;
font-weight:600;

`;

const Info=styled.div`
margin-left:10rem;
display:flex;
align-items: stretch;
    flex-direction: column;

`;
export default Recipe