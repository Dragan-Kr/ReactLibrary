import React, { Component } from 'react';
import RentService from '../services/RentService';
import Pagination from './Pagination';

class ListRentComp extends Component {
    constructor(props){
        super(props)
        this.state = {
            rents:[],
            search: "",
            isOldestFirst: true,

              /**Paginacija */
           
              currentRents: [],
              currentPage: null,
              totalPages: null
  
              /**Paginacija */
        }
        
         this.addRent = this.addRent.bind(this);
         this.editRent = this.editRent.bind(this);
         this.deleteRent = this.deleteRent.bind(this);
         this.toggleSortID=this.toggleSortID.bind(this);
         this.toggleListReverse=this.toggleListReverse.bind(this);
    }

    componentDidMount(){
        RentService.getRents().then((res)=>{
            this.setState({rents:res.data});
        });
        }

    
        addRent(){
            this.props.history.push("/add-Rent");
        }

        editRent(id){
            this.props.history.push(`/update-rent/${id}`);
        }


        
    updateSearch(event){
        this.setState({search: event.target.value.substr(0,20)})
    }
    toggleSortID(){
        this.sortByID();
    }


    sortByID(){
        const {rents} = this.state
        let newRents = rents.reverse();
        if(this.state.isOldestFirst){
            newRents  = rents.sort((a,b)=>a.id > b.id ? 1:-1)

        }else{
            newRents  = rents.sort((a,b)=>a.id < b.id ? 1:-1)
        }
        this.setState({
            isOldestFirst: !this.state.isOldestFirst,
            rents: newRents
        })
    }


    toggleListReverse(event){
        const {rents} = this.state
        let newRents = rents.reverse();
        this.setState({
            rents: newRents
        })
        }


        componentDidMountSort(){

            const rents=ListRentComp
            this.setState({
                isOldestFirst:true,
                rents: rents
            }) 
        }


        deleteRent(id){
            RentService.deleteRent(id).then(res =>{
                this.setState({rents:this.state.rents.filter(rent => rent.id !== id)});
            })
    
        }

        

              /**Paginacija */


      onPageChanged = data => {
		const { rents } = this.state;
        // <PublisherExport genres={allPubs} />
		const { currentPage, totalPages, pageLimit } = data;

		const offset = (currentPage - 1) * pageLimit;
		const currentRents = rents.slice(offset, offset + pageLimit);

		this.setState({ currentPage, currentRents, totalPages });
        console.log("Ovo je iz onPageChanged iz ListPublisherComp" + JSON.stringify(currentRents))
	};


      /**Paginacija */








    render() {

        const {
			rents,
			currentRents,
			currentPage,
			totalPages
		} = this.state;

		const totalRents = rents.length;

		if (totalRents === 0) return null;

		const headerClass = [
			"text-dark py-2 pr-4 m-0",
			currentPage ? "border-gray border-right" : ""
		]
			.join(" ")
			.trim();






        let filteredRents =currentRents.filter(
            (rents) =>{
                return rents.book.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !==-1
            }
        )
        return (
            <div>
                 <h2 className="text-center">Rent List</h2>
                 <div className="row">
                 <input  style={{width:150}} type="text" placeholder="Search book" value={this.state.search} onChange={this.updateSearch.bind(this)}/>
                 <button className="sort-by" onClick={ this.toggleSortID}>Sort</button>
                 <button className="btn btn-primary" onClick={this.addRent}>Add Rent</button>
                 </div>

                 <div className="row">
                 <table className="table table-striped table-bordered">
                     <thead>
                         <tr>
                             <th>ID</th>
                            <th>Rent date</th>
                            <th>Return date</th>
                            <th>Book</th>
                            <th>Employee</th>
                            <th>Membership card</th>
                            <th>Actions</th>
                                    
                         </tr>

                     </thead>
                     <tbody>
                         {
                             filteredRents.map(
                                rent=>
                                 <tr key={rent.id}>
                                     <td>{rent.id}</td>
                                     <td>{rent.rentdate}</td>
                                     <td>{rent.returndate}</td>
                                     <td>{rent.book.name}</td>
                                     <td>{rent.employee.name + " " + rent.employee.surname + " "+ rent.employee.email}</td>
                                     <td>{rent.membershipCard.reader.name + " " + rent.membershipCard.reader.surname + " " + rent.membershipCard.reader.contact}</td>
                                     <td>
                                         <button onClick={ () => this.editRent(rent.id)} className="btn btn-info">Update</button>
                                         <button style={{marginLeft:"10px"}} onClick={ () => this.deleteRent(rent.id)} className="btn btn-danger">Delete</button>

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
									{totalRents}
								</strong>{" "}
								Rents
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
								totalRecords={totalRents}
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

export default ListRentComp;