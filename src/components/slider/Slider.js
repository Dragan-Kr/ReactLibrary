import React from "react";
import { Component } from 'react';

class  Slider  extends Component{
    
    constructor(props){
        super(props)
        this.state ={
            // slider1: ["first", "second", "third", "fourth", "fifth"],
            slider1:[],
            activeIndex: 1,
            left: 0
        }
     this.clickIndicator = this.clickIndicator.bind(this)
    }

//   getInitialState=()=>{
//     return {
//       slider1: ["first", "second", "third", "fourth", "fifth"],
//       activeIndex: 1,
//       left: 0
//     }
//   }


    
  prevSlide=()=> {
    this.setState({
      activeIndex: this.state.activeIndex - 1,
      left: this.state.left + 400 // this.props.sliderWidth not working for some reason
    })
    if (this.state.activeIndex === 1) {
      this.setState({
        activeIndex: this.state.activeIndex + this.state.slider1.length - 1,
        left: this.state.left - 410 * (this.state.slider1.length - 1)
      })
    }
  }

 

   nextSlide=()=> {
    this.setState({
      activeIndex: this.state.activeIndex + 1,
      left: this.state.left - 410
    })
    if (this.state.activeIndex === this.state.slider1.length) {
      this.setState({
        activeIndex: this.state.activeIndex - this.state.slider1.length + 1,
        left: 0
      })
    }
  }
  
   clickIndicator(e){
    this.setState({
      activeIndex: parseInt(e.target.textContent),
      
      left: 410 - parseInt(e.target.textContent) * 410
    })
    console.log("Ovo je textComntent")
  }

  
  render() { 
    var style = {
      left: -40,
      width: 410,
      height: 250
    };

   
  const slider = this.state.slider1;
    // var sliderWrapper={
    //     width: 400,
    //     height: 250,
    //     border: 1px solid #333,
    //     overflow: Hidden,
    //     border-radius: 4 !important;
    // }
    return (
      <div>
        <div  className="slider-wrapper">

        <ul className="slider" >
           
        {slider.map(function(item,index) {
          return (
          <li style={style} className={index+1 === this.state.activeIndex ? 'slider-item' : 'hide'}>{item}</li>
         
          )
        },this)
        }
       
        </ul>

        </div>
        <div className="buttons-wrapper">
        <button className="prev-button" onClick={this.prevSlide}></button>
        <button className="next-button" onClick={this.nextSlide}></button>
        </div>
        <div className="indicators-wrapper">
          <ul className="indicators">
         {slider.map(function(item,index) {
          return (
          <li className={index+1 === this.state.activeIndex ? 'active-indicator' : ''}onClick={this.clickIndicator}>{index+1}</li>
          )
        },this)
        }
          </ul>
        </div>
      </div>
    );}
}
 
export default Slider
// ReactDOM.render(
//   <MyCom sliderWidth="400" sliderHeight="250"/>,
//   document.getElementById("app")
// );

