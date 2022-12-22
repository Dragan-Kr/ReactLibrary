import React from 'react'
import author from '../picture/author.jpg'
import book_order from '../picture/book_order.png'
import book_publisher from '../picture/book_publisher.jpg'
import book from '../picture/book.png'
import employee from '../picture/employee.jpg'
import genre from '../picture/genre.png'
import memCard from '../picture/memCard.jpg'
import payment from '../picture/payment.png'
import rent from '../picture/rent.jpg'
import { useHistory } from 'react-router'
//import {Link} from 'react-router-dom';
import { withRouter } from 'react-router-dom';


const Starting = () => {
  
let history=useHistory();


  return (

    <section className='pocetna'>
      <h3>Many</h3>
      <div className='grid'>
        <div>
          <img src={author} alt='slika-1' />
          <h3>Author</h3>
          
          <button className="btn btn-primary" onClick={()=> {this.history.push("/author")}}>Look</button>
        </div>

        <div>
          <img src={genre} alt='slika-2' />
          <h3>Genre</h3>
         
          <button className="btn btn-primary" onClick={()=> {history.push("/genre")}}>Look</button>
        </div>

        <div>
          <img src={book} alt='slika-3' />
          <h3>Book</h3>
         
          <button className="btn btn-primary" onClick={()=> {history.push("/book")}}>Look</button>
        </div>

        <div>
          <img src={book_order} alt='slika-4' />
          <h3>Book order</h3>
        
          <button className="btn btn-primary" onClick={()=> {history.push("/bookOrder")}}>Look</button>
        </div>
        <div>
          <img src={book_publisher} alt='slika-5' />
          <h3>Publisher </h3>
         
          <button className="btn btn-primary" onClick={()=> {history.push("/publisher")}}>Look</button>
        </div>
 

        <div>
          <img src={memCard} alt='slika-6' />
          <h3>Membership card </h3>
        
          <button className="btn btn-primary" onClick={()=> {history.push("/memCard")}}>Look</button>
        </div>




        <div>
          <img src={payment} alt='slika-7' />
          <h3>Payment </h3>
         
          <button className="btn btn-primary" onClick={()=> {history.push("/payment")}}>Look</button>
        </div>


        <div>
          <img src={rent} alt='slika-8' />
          <h3>Rent </h3>
         
          <button className="btn btn-primary" onClick={()=> {history.push("/rent")}}>Look</button>
        </div>


        <div>
          <img src={employee} alt='slika-9' />
          <h3>Employee </h3>
         
          <button className="btn btn-primary" onClick={()=> {history.push("/employee")}}>Look</button>
        </div>
        {/* <div>
          <Slider />
        </div> */}
 
      </div>
    </section>
    
    
  
  )
  
       
       
}

export default withRouter(Starting);


