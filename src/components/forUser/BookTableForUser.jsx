import React, { Component } from 'react'
import BookService from '../../services/BookService';
import PictureSlider from '../slider/PictureSlider'
import AnimatedText from './AnimatedText';
import OptionForUser from './OptionForUser';
import Pagination from '../Pagination';


<AnimatedText/>;
<PictureSlider/>
export default class BookTableForUser extends Component {
    constructor(props){
        super(props)
        this.state = {
            books:[],
            search: "",
            isOldestFirst: true,

           //paginacija
            currentBooks: [],
		    currentPage: null,
		    totalPages: null

           //paginacija
        }
      
        this.updateSearch = this.updateSearch.bind(this);
        
        // this.toggleListReverse = this.toggleListReverse.bind(this);
        // this.toggleSortID=this.toggleSortID.bind(this);
        // this.toggleListReverse=this.toggleListReverse.bind(this);


       
          
    }



    /**Paginacija */
    componentDidMount(){
        BookService.getBooks().then((res)=>{
            const books = res.data;
            this.setState({books});
          
        });
    }
     

       
    

        updateSearch(event){
            this.setState({search: event.target.value.substr(0,20)})
        }

        // toggleSortID(){
        //     this.sortByID();
        // }
     

        // sortByID(){
        //     const {books} = this.state
        //     let newBooks = books.reverse();
        //     if(this.state.isOldestFirst){
        //         newBooks  = books.sort((a,b)=>a.id > b.id ? 1:-1)

        //     }else{
        //         newBooks  = books.sort((a,b)=>a.id < b.id ? 1:-1)
        //     }
        //     this.setState({
        //         isOldestFirst: !this.state.isOldestFirst,
        //         books: newBooks
        //     })
        // }


        
        // toggleListReverse(event){
        //     const {books} = this.state
        //     let newBooks = books.reverse();
        //     this.setState({
        //         books: newBooks
        //     })
        //     }

        //     componentDidMountSort(){

        //         const books=BookTableForUser
        //         this.setState({
        //             isOldestFirst:true,
        //             books: books
        //         }) 
        //     }

///Paginacija//

onPageChanged = data => {
 const {books} = this.state;

 const { currentPage, totalPages, pageLimit } = data;

		const offset = (currentPage - 1) * pageLimit;
		const currentBooks = books.slice(offset, offset + pageLimit);

		this.setState({ currentPage, currentBooks, totalPages });
        console.log("Ovo je CurrentBooks iz onPageChanged iz BookTableForUser" + JSON.stringify(currentBooks))

}




//Paginacija////



    render() {
        const {
			books,
			currentBooks,
			currentPage,
			totalPages
		} = this.state;

		const totalBooks = books.length;
      console.log("Ovo je currentBooks" + JSON.stringify(currentBooks))
        if (totalBooks === 0) return null;

        const headerClass = [
			"text-dark py-2 pr-4 m-0",
			currentPage ? "border-gray border-right" : ""
		]
			.join(" ")
			.trim();
        /**Paginacija */
        
        // let filteredBooks =this.state.books.filter(
        //     (books) =>{
        //         return books.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !==-1
        //     }
        // )
        
        let Ispis = ()=>{
            console.log("ovo je iz  let filteredCurentBooks" + JSON.stringify(this.currentBooks))
            return(
                <div></div>
            )
        }

        let FilteredCurentBooks = currentBooks.filter(
            (books) =>{
                console.log("ovo je iz  let filteredCurentBooks" + JSON.stringify(currentBooks))
                return books.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !==-1
            }
        )
    
        return (
            
            <div>
                <PictureSlider/>
{/* 
                <h2 className="text-center">Book List</h2> */}
                 <div className="row">
                 <input style={{width:150}} type="text" placeholder="Search name" value={this.state.search} onChange={this.updateSearch.bind(this)}/>
                 {/* <button className="sort-by" onClick={ this.toggleSortID}>Sort</button> */}
                 {/* <button className="btn btn-primary" onClick={this.addBook}>Add Book</button> */}
                 </div>

                 <div className="row">
                 <table className="table table-striped table-bordered">
                     <thead>
                         <tr>
                            
                             <th>Name</th>
                             <th>Author</th>
                             <th>Genre</th>
                            
                         </tr>

                     </thead>
                     <tbody>
                         {
                             FilteredCurentBooks.map(
                                 book=>
                                 <tr key={book.id}>
                                     
                                     <td>{book.name}</td>
                                     <td>{book.author.name + " " + book.author.surname}</td>
                                     <td>{book.genre.name}</td>
                                     
                                     {/* <td>
                                         <button onClick={ () => this.editBook(book.id)} className="btn btn-info">Update</button>
                                         <button style={{marginLeft:"10px"}} onClick={ () => this.deleteBook(book.id)} className="btn btn-danger">Delete</button>
                                     </td> */}
                                     
                                 </tr>
                             )
                         }
                     </tbody>
                 </table>
                 </div>
                
                 {/* Paginacija */}
                 <div className="container mb-5">
				<div className="row d-flex flex-row py-5">
					<div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
						<div className="d-flex flex-row align-items-center">
							<h2 className={headerClass}>
								<strong className="text-secondary">
									{totalBooks}
								</strong>{" "}
								Books
							</h2>
							{currentPage && (
								<span className="current-page d-inline-block h-100 pl-4 text-secondary">
									Page{" "}
									<span className="font-weight-bold">
										{currentPage}
									</span>{" "}
									/{" "}
									<span className="font-weight-bold">
										{totalPages}
									</span>
								</span>
							)}
						</div>
						<div className="d-flex flex-row py-4 align-items-center">
							<Pagination
								totalRecords={totalBooks}
								pageLimit={2} 
								pageNeighbours={1}
								onPageChanged={this.onPageChanged}
							/>
						</div>
					</div>
                  </div>

                  </div>
                 {/* Paginacija */}
                 <Ispis/>
                 <AnimatedText/>;
                 <OptionForUser />
            </div>
        );}
        
}

<AnimatedText/>;

