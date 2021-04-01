import React, { Component } from 'react';
import Recipe from './Recipe.js';

var axios = require("axios").default;


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipesCollection: [],
    }
  }

  componentDidMount(){
    this.getAllRecipes()
  }


  getAllRecipes(){
    var options = {
      method: 'GET',
      url: 'http://localhost:3000/getAllRecipes',
    };

    axios.request(options)
    .then((response) => {
      this.setState({recipesCollection: response.data.reverse()});
    })
    .catch(function (error) {
      console.log('error in axios')
    });
  }

  //Post new recipe
  postRecipe(){

    //Receive values from input forms and store in variables
    const recipeName = document.getElementById('recipeNameInput').value;
    const cookTime = document.getElementById('cookTimeInput').value;
    const notes = document.getElementById('notesInput').value;
    const createdBy = document.getElementById('createdByInput').value;
    const ingredients = document.getElementById('ingredientsInput').value;
    const link = document.getElementById('linkInput').value;
    const imageURL = document.getElementById('imageURLInput').value;
    
  
    //Make a post request to server
    var options = {
      method: 'POST',
      url: 'http://localhost:3000/newRecipe',
      data: {recipeName, cookTime, notes, createdBy, ingredients, link, imageURL
      }
    };

    axios.request(options)
    .then((response) => {
      console.log(response)
    })
    .catch(function (error) {
      console.log('error in axios post')
    });

    this.getAllRecipes();

  }


  render() {
    const recipesCollection = this.state.recipesCollection;

    //Return loading if data has not been received yet
    if(recipesCollection.length <1){
      return (
        <div>
            <p>Loading...</p>
        </div>
      );
    }

    //Create list of recipes 
    const recipes = []

    recipesCollection.forEach((recipeObj, index) => {
      // console.log(recipeObj)
      recipes.push(<Recipe getAllRecipesAction = {() => this.getAllRecipes()} key = {index} recipeObj = {recipeObj} />)
    })

    return(
      <div>
        <div>
          <h3>Create New</h3>
          
          <input id={'recipeNameInput'} placeholder={"Recipe Name (required)"} />
          <input id={'cookTimeInput'} placeholder={"Cook Time"} />
          <input id={'notesInput'} placeholder={"Notes"} />
          <input id={'createdByInput'} placeholder={"Created By"} />
          <input id={'ingredientsInput'} placeholder={"Ingredients (required)"} />
          <input id={'linkInput'} placeholder={"Website Link"} />
          <input id={'imageURLInput'} placeholder={"Image URL"} />
          
          <div style = {{marginTop: 10}}>
            <button onClick = {() => this.postRecipe()}>Submit</button>
          </div>

        </div>
        {recipes}
      </div>
    )
    
  }
}

export default App;
