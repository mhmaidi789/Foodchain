import React, { Component } from "react";



export default class PopUp extends Component {

render() {
  // console.log(this.props.ingredientsList)
  const ingredientsList = this.props.ingredientsList
  console.log(ingredientsList)

  const ingredientsListsElements = [];

  for (const ingredient in ingredientsList){
    if(Array.isArray(ingredientsList[ingredient])){
      const ingredientContainer = <div style = {{display: 'flex'}}>
      <label>{ingredient}: </label>
      <div>
        <p>Title: {ingredientsList[ingredient][0].title}</p>
        <p>Price: {ingredientsList[ingredient][0].price}</p>
        <p>Prime elgible: {ingredientsList[ingredient][0].isPrimeEligible === "1"?"Yes":"No"}</p>
        <a href= {ingredientsList[ingredient][0].detailPageURL}>View Item on Amazon</a>
      </div>
    </div>
    ingredientsListsElements.push(ingredientContainer)
    }else {
        const ingredientContainer = <div style = {{display: 'flex'}}>
        <label>{ingredient}: </label>
        <div>
          <p>Title: {ingredientsList[ingredient].title}</p>
          <p>Price: {ingredientsList[ingredient].price}</p>
          <p>Prime elgible: {ingredientsList[ingredient].isPrimeEligible === "1"?"Yes":"No"}</p>
          <a href= {ingredientsList[ingredient].detailPageURL}>View Item on Amazon</a>
        </div>
      </div>
      ingredientsListsElements.push(ingredientContainer)
    }
    
  }
  

  return (
   <div className="modal">
     {/* Buttons */}
      <div>
        <button>Add to Amazon Cart</button>
        <button className="close" onClick={() => this.props.closePopUp()}>Hide</button> 
      </div>
      {/* Ingredients */}
      {ingredientsListsElements}
      <div>


      </div>

    </div>
  );
 }
}
