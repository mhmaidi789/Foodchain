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
      this.setState({recipesCollection: response.data});
    })
    .catch(function (error) {
      console.log('error in axios')
    });
  }

  //Post new recipe
  postRecipe(){
    console.log(document.getElementById('recipeNameInput').value);

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
      recipes.push(<Recipe key = {index} recipeObj = {recipeObj} />)
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
