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
          
          <input placeholder={"Recipe Name"} />
          <input placeholder={"Notes"} />
          <input placeholder={"Cook Time"} />
          <input placeholder={"Link"} />
          <input placeholder={"Image URL"} />
          <input placeholder={"Ingredients"} />
          <input placeholder={"Created By"} />
          <div style = {{marginTop: 10}}>
            <button>Submit</button>
          </div>
        </div>
        {recipes}
      </div>
    )
    
  }
}

export default App;
