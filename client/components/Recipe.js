import React, { Component } from 'react';


export default class Recipe extends Component {
  constructor(props) {
    super(props);
  }


  render(){
    return(
      <div>
        {this.props.recipeObj.recipeName}
      </div>
    )
  }




}