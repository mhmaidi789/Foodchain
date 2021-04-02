import React, { Component } from 'react';
import PopUp from './Popup.js'
var axios = require("axios").default;


export default class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopUp: false,
      ingredientsList: [],
    }
  }

  

  closePopUp(){
    this.setState({showPopUp: false});
  }


  //Delete Recipe
  deleteRecipe(){

    var options = {
      method: 'DELETE',
      url: 'http://localhost:3000/deleteRecipe',
      data: 
      {"_id": this.props.recipeObj["_id"] }
    };

    axios.request(options)
    .then((response) => {
      console.log(response)
      //Get recipes in Database
      this.props.getAllRecipesAction()
    })
    .catch(function (error) {
      console.log('error in axios')
    });
    
  }

  //Search Amazon and toggle Popup
  searchAmazonCreatePopUp(){

    // console.log(this.props.recipeObj["_id"])
    const _id = this.props.recipeObj["_id"]

    var options = {
      method: 'GET',
      url: 'http://localhost:3000/getRecipeSearchAmazon',
      params: {
        _id : this.props.recipeObj["_id"]
      },
      data: {
        "_id" : "60652f2fcf8670a82c629c29"
      }
    };

    axios.request(options)
    .then((response) => {
      // console.log(response)
      //Get recipes in Database
      this.setState({
        ingredientsList: response.data.ingredientsCheckList,
        showPopUp: true});
    })
    .catch(function (error) {
      console.log('error in axios')
    });

    
  }


  render(){

    //Get image url
    const longLink = this.props.recipeObj.imageURL;
    let imageLink;
    if(longLink){
      const startingIndex = longLink.indexOf('(')
      const endingIndex = longLink.indexOf(')');
      imageLink = longLink.slice(startingIndex+1, endingIndex)
    }
    let image;
    if(imageLink){
      image = <img src = {imageLink} style = {{height: 100, width: 100}} /> 
    } else {
      image = <div style = {{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 100, width: 100}}>
            No Image Found
            </div>
    };


    return(
      <div className = {'recipe'} >
        <div style = {{display: 'flex', flex: 1, flexDirection: "row",}}> 
        {/* Basic Information */}
          <div style = {{margin: 6}}>
            {image}
          </div>

          <div style = {{flex: 1}}>
            <div>
              Name: {this.props.recipeObj.recipeName}
            </div>
            <div>
              Prep Time: {this.props.recipeObj.cookTime?this.props.recipeObj.cookTime + " Minutes": "Unknown"}
            </div>
            <div>
              Notes: {this.props.recipeObj.notes?this.props.recipeObj.notes:"Unkown"}
            </div>
            <div>
              Created By: {this.props.recipeObj.createdBy?this.props.recipeObj.createdBy:"Unkown"}
            </div>
            <div>
              Ingredients: {this.props.recipeObj.ingredients}
            </div>
            <div>
              Website URL: {this.props.recipeObj.link?this.props.recipeObj.link:"Unkown"}
            </div>
          </div>

          {/* Buttons */}
          <div >
            <button onClick = {() => this.searchAmazonCreatePopUp()}>Amazon Search</button>
            <button onClick = {() => this.deleteRecipe()}>Delete Recipe</button>
          </div>
        </div>

        {/* Popup */}
        <div>
          {this.state.showPopUp?<PopUp closePopUp = {() => this.closePopUp()} ingredientsList = {this.state.ingredientsList}/> : null}
        </div>
      </div>
    )
  }

}