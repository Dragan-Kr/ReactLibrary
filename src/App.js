//import logo from './logo.svg';
import './App.css';

import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
//import React, {useState} from 'react';

import ListPublisherComp from './components/ListPublisherComp';
import FooterComponent from './components/FooterComponent';
import Header from './components/HeaderComponent';
import CreatePublisherComp from './components/CreatePublisherComp';
import ListAuthorComp from './components/ListAuthorComp';
import CreateAuthorComp from './components/CreateAuthorComp';
import ListEmployeeComp from './components/ListEmployeeComp';
import ListGenreComp from './components/ListGenreComp';
import CreateGenreComp from './components/CreateGenreComp';
import ListBookComp from './components/ListBookComp';
import CreateBookComp from './components/CreateBookComp';
import ListBookOrder from './components/ListBookOrder';
import ListReaderComp from './components/ListReaderComp';
import CreateReaderComp from './components/CreateReaderComp';
import ListMemCardComp from './components/ListMemCardComp';
import ListRentComp from './components/ListRentComp';
import ListPaymentComp from './components/ListPaymentComp';
import UpdateAuthorComp from './update/UpdateAuthorComp';
import UpdateGenreComp from './update/UpdateGenreComp';
import Registration from './components/Registration';
import CreateEmployeeComp from './components/CreateEmployeeComp';
import CreateMemCardComp from './components/CreateMemCardComp';
import CreateBookOrder from './components/CreateBookOrder';
import CreateRentComp from './components/CreateRentComp';
import CreatePaymentComp from './components/CreatePaymentComp';
import UpdateReaderComp from './update/UpdateReaderComp';
import UpdatePublisherComp from './update/UpdatePublisherComp';
import UpdateBookComp from './update/UpdateBookComp';
import UpdateMemCardComp from './update/UpdateMemCardComp';
import Dashboard from './components/Dashboard';

// import SignUp from './components/SingUp'
import Starting from'./components/Starting';
import {Provider} from 'react-alert';
// import { useSelector } from "react-redux";
import UpdateRentComp from './update/UpdateRentComp';
import UpdateBookOrder from './update/UpdateBookOrder';
import UpdatePaymentComp from './update/UpdatePaymentComp';
import ListRoleComp from './components/ListRoleComp';

import Login from './components/Login';


// import PrivateRoute from './components/routing/PrivateRoute';
// import Register from './components/auth/Register';
import Paginator from './components/Paginator';
import BookTableForUser from './components/forUser/BookTableForUser';
import About from './components/forUser/About';
function App() {
  

  return (
    <div>
      <Router>

       <Header/>
      {/* <Route path exact to="/" > <Dashboard/> <Starting/> </Route> */}
      <Route path exact to="/" > <Dashboard/>  </Route>



    





      {/* <Route exact path="/" component={Dashboard}/>  */}
       {/* <Route path="/singup"><SignUp/></Route>  Ovako je kod k*/}
       {/* <Route path="/singup" component={SignUp}/> Ovako da nebi iskakala greska */}

        

      <div className="container">
        <Provider>
         
               <Switch>
                   <Route path="/publisher"  component={ListPublisherComp}/> 
                   <Route path="/author"  component={ListAuthorComp}/> 
                   <Route path="/employee"  component={ListEmployeeComp}/>
                   <Route path="/genre"  component ={ListGenreComp}/>
                   <Route path="/book"  component ={ListBookComp}/>
                   <Route path="/bookOrder"  component ={ListBookOrder}/>
                   <Route path="/reader"  component ={ListReaderComp}/>
                   <Route path="/memCard"  component ={ListMemCardComp}/>
                   <Route path="/rent"  component ={ListRentComp}/>
                   <Route path="/payment"  component ={ListPaymentComp}/>
                   <Route path="/register"  component ={Registration}/>
                   <Route path="/bookTableForUser" component={BookTableForUser}/>
                   <Route path="/about" component={About}/>
                   <Route path="/starting" component={Starting} />

                  
                 
        
                   <Route path="/dashboard"  component ={Dashboard}/>
                   <Route path="/role"  component ={ListRoleComp}/>

                





                  <Route path="/add-Publisher"  component={CreatePublisherComp}/>
                  <Route path="/add-Author"  component={CreateAuthorComp}></Route>
                  <Route path="/add-Genre"  component={CreateGenreComp}/>
                  <Route path="/add-Book"  component={CreateBookComp}/>
                  <Route path="/add-Reader"  component={CreateReaderComp}/>
                  <Route path="/add-Employee"  component={CreateEmployeeComp}/>
                  <Route path="/add-MemCard"  component={CreateMemCardComp}/>
                  <Route path="/add-BookOrder"  component={CreateBookOrder}/>
                  <Route path="/add-Rent"  component={CreateRentComp}/>
                  <Route path="/add-Payment"  component={CreatePaymentComp}/>
                  


                  <Route path="/update-author/:id"  component={UpdateAuthorComp}/>
                  <Route path="/update-genre/:id"  component={UpdateGenreComp}/>
                  <Route path="/update-reader/:id"  component={UpdateReaderComp}/>
                  <Route path="/update-publisher/:id"  component={UpdatePublisherComp}/>
                  <Route path="/update-book/:id"  component={UpdateBookComp}/>
                  <Route path="/update-memCard/:id"  component={UpdateMemCardComp}/>
                  <Route path="/update-rent/:id"  component={UpdateRentComp}/>
                  <Route path="/update-bookOrder/:id"  component={UpdateBookOrder}/>
                  <Route path="/update-payment/:id"  component={UpdatePaymentComp}/>
                  <Route path="/update-employee/:id"  component={UpdatePaymentComp}/>

                  <Route path="paginator" component={Paginator} />

 
                   {/* <Route path="/login" ><Login/></Route>  */}
                   <Route path="/login" component={Login}/> 
                 
               </Switch>
              
               </Provider>
            </div>
          <FooterComponent />
          </Router>
    </div>
   
  );
}
export default App;