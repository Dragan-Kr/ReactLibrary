import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import Cookies from 'universal-cookie';
import { NavLink } from 'react-router-dom';

const cookies = new Cookies();
// let prom = 1;




const Header = () => {
    console.log('header');
    console.log(cookies.get('RolaKorisnik') + 'rola');
    let history=useHistory();

    if(cookies.get('RolaKorisnik') === "1"){
       
        return (
            <>
               <header className="header">
                   <div>
                       <Link className='links' to="/">Home</Link>
                   </div>
                   <nav className="navbar">
                       <ul>
                 
                           
                            <NavLink className="navbar-item" activeClassName="is-active" to="/employee" style={{marginLeft:"10px"}}>Employee </NavLink>
                            <NavLink className="navbar-item" activeClassName="is-active" to="/bookTableForUser" style={{marginLeft:"10px"}}>Window For User </NavLink>
                            {/* <Link className='links' to="/register" >Sing Up</Link> */}
                            <Link className='links' onClick={() => {cookies.set('RolaKorisnik', -1, { to: '/' }); history.push("/login"); window.location.reload();} }>Odjava</Link>

                        </ul>
                    </nav>
                </header>
            </>
        )
}else if(cookies.get('RolaKorisnik') === "2"){
    return (
        <>
           <header className="header">
               <div>
                   <Link className='links' to="/">Home</Link>
               </div>
               <nav className="navbar">
                   <ul>
 <NavLink className="navbar-item" to="/author" style={{marginLeft:"-700px"}}>Author</NavLink>

<NavLink className="navbar-item" activeClassName="is-active" to="/Genre" style={{marginLeft:"10px"}}>Genre </NavLink>

<NavLink className="navbar-item" activeClassName="is-active" to="/book" style={{marginLeft:"10px"}}>Book </NavLink>

<NavLink className="navbar-item" activeClassName="is-active" to="/publisher"style={{marginLeft:"10px"}}>Publisher </NavLink>

<NavLink className="navbar-item" activeClassName="is-active" to="/bookOrder" style={{marginLeft:"10px"}}>Book order </NavLink>

<NavLink className="navbar-item" activeClassName="is-active" to="/rent" style={{marginLeft:"10px"}}>Rent </NavLink>

<NavLink className="navbar-item" activeClassName="is-active" to="/payment" style={{marginLeft:"10px"}}>Payment </NavLink>

<NavLink className="navbar-item" activeClassName="is-active" to="/memCard" style={{marginLeft:"10px"}}>Membership card </NavLink>
<NavLink className="navbar-item" activeClassName="is-active" to="/reader" style={{marginLeft:"10px"}}>Reader </NavLink>
{/* <NavLink className="navbar-item" activeClassName="is-active" to="/starting" style={{marginLeft:"10px"}}>Starting </NavLink> */}
<NavLink className="navbar-item" activeClassName="is-active" to="/bookTableForUser" style={{marginLeft:"10px"}}>Window For User </NavLink>

 <Link className='links' onClick={() => {cookies.set('RolaKorisnik', -1, { to: '/' }); history.push("/login"); window.location.reload();} }>Odjava</Link>
 

                   </ul>
               </nav>

               {/* <div>
                   <Starting/>
               </div> */}
           </header>
        </>
    )  
}
else{
    return (
        <>
           <header className="header">
               <div>
                   <Link className='links' to="/">Home</Link>
               </div>
               <nav className="navbar">
                   <ul>
                   <Link className='links' title='IF you are regular viewer' to="/bookTableForUser" >First Click Me</Link>
                   <Link className='links' to="/login" >Login</Link>
                   {/* <Link className='links' to="/singUp" >Sing Up</Link> */}
                   <Link className='links' to="/register" >Sing Up</Link>

                   </ul>
               </nav>
           </header>
        </>
    )    
}
}
export default Header