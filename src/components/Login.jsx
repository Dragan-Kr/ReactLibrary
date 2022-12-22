import React, { Component } from 'react';

import Cookies from 'universal-cookie';
import EmployeeService from '../services/EmployeeService';

const cookies = new Cookies();



class Login extends Component {
    constructor(props) {
        super(props) 

        this.state = {
            username: '',
            password: ''
        }
        
       


    } 

    


      onChange2 = e => {
        cookies.set('RolaKorisnik', "", { path: '/' });

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;



       EmployeeService.getLogIn(username, password).then((res) => {
       const rez = res.data;
       console.log(rez + 'returnRezLogin')
       if(rez === 1)
       {
        EmployeeService.getRole(username).then((res2) => {
           const rezRola = res2.data;
           console.log(rezRola + 'rezRola')

           cookies.set('RolaKorisnik', rezRola, { path: '/' });
          });
       }
       else if(rez === 0){
        alert("Netacni uneti podaci!");
        cookies.set('RolaKorisnik', -1, { path: '/' });

       }
       else{
        alert("Korisnik sa unetim username-om ne postoji!");
        cookies.set('RolaKorisnik', -1, { path: '/' });
       }
       });



  

       console.log(cookies.get('RolaKorisnik') + 'rola');
       this.forceUpdate();
      };

 


    render() {

        

        return (
            <section className="home login">
        <div className="overlay">
            <form onSubmit={this.onChange2} className="form">
                <input type="text" name="username" id="username"  
                placeholder="Your username" 
                required/>
                <input type="password" name="password"  id="password" 
                placeholder="Enter your password"  required/>
                <button  type="submit" >Log in</button>
            </form>

        </div>

    </section>
        );
    }
}

export default Login;