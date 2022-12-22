import React, { Component } from 'react';
import BookOrderSevice from '../services/BookOrderSevice';
import Pagination from './Pagination';
class ListBookOrder extends Component {
    constructor(props){
        super(props)
        this.state = {
            bookOrders:[],
            search: "",
            isOldestFirst: true,

                /**Paginacija */
           
                currentBookOrders: [],
                currentPage: null,
                totalPages: null
    
                /**Paginacija */
           
        }
      
          this.addBookOrder = this.addBookOrder.bind(this);
          this.editBookOrder = this.editBookOrder.bind(this);
          this.toggleSortID=this.toggleSortID.bind(this);
          this.toggleListReverse=this.toggleListReverse.bind(this);
          //this.sortByID = this.sortByID.bind(this);
          this.deleteBookOrder = this.deleteBookOrder.bind(this);
          this.updateSearch = this.updateSearch.bind(this);
        //   this.sortAscending = this.sortAscending.bind(this);
        //   this.sortDescending = this.sortDescending.bind(this);
          
    }
    


    componentDidMount(){

        BookOrderSevice.getBookOrders().then((res)=>{
            this.setState({bookOrders:res.data});
        });
        }

       
        
        addBookOrder(){
            this.props.history.push("/add-BookOrder");
        }

        editBookOrder(id){
            this.props.history.push(`/update-bookOrder/${id}`);
        }
      
        updateSearch(event){
            this.setState({search: event.target.value.substr(0,20)})
        }
        toggleSortID(){
            this.sortByID();
        }

        sortByID(){
            const {bookOrders} = this.state
            let newBookOrders = bookOrders.reverse();
            if(this.state.isOldestFirst){
              newBookOrders  = bookOrders.sort((a,b)=>a.id > b.id ? 1:-1)

            }else{
                newBookOrders  = bookOrders.sort((a,b)=>a.id < b.id ? 1:-1)
            }
            this.setState({
                isOldestFirst: !this.state.isOldestFirst,
                bookOrders: newBookOrders
            })
        }


        toggleListReverse(event){
        const {bookOrders} = this.state
        let newBookOrders = bookOrders.reverse();
        this.setState({
            bookOrders: newBookOrders
        })
        }


        componentDidMountSort(){

            const bookOrders=ListBookOrder
            this.setState({
                isOldestFirst:true,
                bookOrders: bookOrders
            }) 
        }

        
        deleteBookOrder(id){
            BookOrderSevice.deleteBookOrder(id).then(res =>{
                this.setState({bookOrders:this.state.bookOrders.filter(bookOrder => bookOrder.id !== id)});
            })
    
        }

                /**Paginacija */


      onPageChanged = data => {
		const { bookOrders } = this.state;
        // <PublisherExport genres={allPubs} />
		const { currentPage, totalPages, pageLimit } = data;

		const offset = (currentPage - 1) * pageLimit;
		const currentBookOrders = bookOrders.slice(offset, offset + pageLimit);

		this.setState({ currentPage, currentBookOrders, totalPages });
        console.log("Ovo je iz onPageChanged iz ListPublisherComp" + JSON.stringify(currentBookOrders))
	};


      /**Paginacija */








    render() {
        const {
			bookOrders,
			currentBookOrders,
			currentPage,
			totalPages
		} = this.state;
		const totalBookOrders = bookOrders.length;

		if (totalBookOrders === 0) return null;

		const headerClass = [
			"text-dark py-2 pr-4 m-0",
			currentPage ? "border-gray border-right" : ""
		]
			.join(" ")
			.trim();






        let filteredBookOrders =currentBookOrders.filter(
            (bookOrders) =>{
                return (bookOrders.employee.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !==-1         
                )}
        )

        



        return (
            <div>
                <h2 className="text-center">Book order List</h2>
                 <div className="row">
                     <input style={{width:240}} type="text" placeholder="Search by name of employee" value={this.state.search} onChange={this.updateSearch.bind(this)}/>
                     <button className="sort-by" onClick={ this.toggleSortID}>Sort</button>

                 <button className="btn btn-primary" onClick={this.addBookOrder}>Add Book order</button>
                 </div>

                 <div className="row">

                 <table className="table table-striped table-bordered">
                     <thead>
                         <tr>
                             <th>ID</th>
                             <th>Number of books</th>
                             <th>Date of order</th>
                             <th>Type of payment</th>
                             <th>Book</th>
                             <th>Employee</th>
                             <th>Publisher</th>
                             <th>Actions</th>
                           
                             
                         </tr>

                     </thead>
                     <tbody>
                         {
                            filteredBookOrders.map(
                                bookOrder=>
                                 <tr key={bookOrder.id}>
                                      <td>{bookOrder.id}</td>
                                     <td>{bookOrder.booknum}</td>
                                     <td>{bookOrder.orderdat}</td>
                                     <td>{bookOrder.paymenttype}</td>
                                     <td>{bookOrder.book.name}</td>
                                     <td>{bookOrder.employee.name +" " +bookOrder.employee.surname}</td>
                                     <td>{bookOrder.publisher.name}</td>
                                     <td>
                                     
                                         <button onClick={ () => this.editBookOrder(bookOrder.id)} className="btn btn-info">Update</button>
                                         <button style={{marginLeft:"10px"}} onClick={ () => this.deleteBookOrder(bookOrder.id)} className="btn btn-danger">Delete</button>
                                         
                                     
                                     </td>
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
									{totalBookOrders}
								</strong>{" "}
								Book Orders
							</h2>
							{currentPage && (
								<span className="current-page d-inline-block h-100 pl-4 text-secondary">
									{" "} 
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
								totalRecords={totalBookOrders}
								pageLimit={2} 
								pageNeighbours={1}
								onPageChanged={this.onPageChanged}
							/>
						</div>
					</div>
                  </div>

                  </div>
               {/* Paginacija */}






            </div>
        );
    }
}

export default ListBookOrder;