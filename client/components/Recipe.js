import React, { Component } from 'react';


const { innerWidth: width, innerHeight: height } = window;


export default class Recipe extends Component {
  constructor(props) {
    super(props);
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
      <div className = {'recipe'} style = {{display: 'flex', flex: 1, flexDirection: "row",}}>

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

        {/* Amazon Portion */}
        <div >
          <button>Check Amazon</button>

        </div>
      </div>
    )
  }




}