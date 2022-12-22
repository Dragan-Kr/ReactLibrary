// import axios from "axios";
// import React from 'react';

// const dataPublishers = ()=>{
//     axios.get("http://localhost:8080/publisher")
//     .then(response => response.json())
//     .then(response => convertDataFromAPI(response))
//     .catch(error => console.log(error.message))
//   }
  
//   const convertDataFromAPI = (data) => { 
//     var newArr = [];
  
//     for ( var a = 0; a < data.length; a++){
//      var myObject = {};
//      data[a].name ? myObject['name'] = data[a].name : null
//      data[a].contact ? myObject['contact'] = data[a].contact : null
     
//        newArr.push(myObject)
//      }
//      return(
//          <div>

//          </div>
        
//      )
//     }
     
//     export default dataPublishers