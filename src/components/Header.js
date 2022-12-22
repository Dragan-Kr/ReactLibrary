import React from 'react'
import {Link} from 'react-router-dom'


const Header = () => {
    return (
        <>
         <header className="header">
             <div>
                 <Link className="links" to='/'>Home</Link>
             </div>

             <nav className="navbar">
                 <ul>

                     <Link to='/login' className="links" >Login</Link>
                     
                    
                     <Link to='/signup' className="links" >Sign Up</Link>
{/* 
                     <Link to='/signup' className="links" >Sign Up</Link> */}



                 </ul>

             </nav>

         </header>
        </>
    )
}

export default Header;
