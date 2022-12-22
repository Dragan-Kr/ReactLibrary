import React, { Component } from 'react';
import PublisherService from '../services/PublisherService';
import Pagination from  "./Pagination"
import PublisherExport from './forUser/PublisherExport';

class ListPublisherComp extends Component {
    constructor(props){
        super(props)
        this.state = {
            allPubs:[],
            search: "",
            isOldestFirst: true,

            /**Paginacija */
           
            currentPubs: [],
		    currentPage: null,
		    totalPages: null

            /**Paginacija */

        }
        this.addPublisher = this.addPublisher.bind(this);
        this.editPublisher = this.editPublisher.bind(this);
        this.updateSearch = this.updateSearch.bind(this);
        this.toggleSortID=this.toggleSortID.bind(this);
        this.toggleListReverse=this.toggleListReverse.bind(this);
        this.deletePublisher = this.deletePublisher.bind(this);


    }
   
    componentDidMount(){
        PublisherService.getPublishers().then((res)=>{
            const allPubs =res.data
            this.setState({ allPubs });

        // const allPubs =res.data
        // this.setState({ allPubs });
    });
    }

    addPublisher(){
        this.props.history.push("/add-Publisher");
    }

    editPublisher(id){
        this.props.history.push(`/update-publisher/${id}`);
    }


    updateSearch(event){
        this.setState({search: event.target.value.substr(0,20)})
    }

    toggleSortID(){
        this.sortByID();
    }


    sortByID(){
        const {allPubs} = this.state
        let newallPubs = allPubs.reverse();
        if(this.state.isOldestFirst){
            newallPubs  = allPubs.sort((a,b)=>a.id > b.id ? 1:-1)

        }else{
            newallPubs  = allPubs.sort((a,b)=>a.id < b.id ? 1:-1)
        }
        this.setState({
            isOldestFirst: !this.state.isOldestFirst,
            allPubs: newallPubs
        })
    }

    

    toggleListReverse(event){
        const {allPubs} = this.state
        let newallPubs = allPubs.reverse();
        this.setState({
            allPubs: newallPubs
        })
    }

    


    componentDidMountSort(){

        const allPubs=ListPublisherComp
        this.setState({
            isOldestFirst:true,
            allPubs: allPubs
        }) 
    }

    deletePublisher(id){
        PublisherService.deletePublisher(id).then(res =>{
            this.setState({allPubs:this.state.allPubs.filter(publisher => publisher.id !== id)});
        })

    }


      /**Paginacija */


      onPageChanged = data => {
		const { allPubs } = this.state;
        <PublisherExport allPubs={allPubs} />
		const { currentPage, totalPages, pageLimit } = data;

		const offset = (currentPage - 1) * pageLimit;
		const currentPubs = allPubs.slice(offset, offset + pageLimit);

		this.setState({ currentPage, currentPubs, totalPages });
        console.log("Ovo je iz onPageChanged iz ListPublisherComp" + JSON.stringify(currentPubs))
	};


      /**Paginacija */



    render() {
        const {
			allPubs,
			currentPubs,
			currentPage,
			totalPages
		} = this.state;
		const totalPubs = allPubs.length;

		if (totalPubs === 0) return null;

		const headerClass = [
			"text-dark py-2 pr-4 m-0",
			currentPage ? "border-gray border-right" : ""
		]
			.join(" ")
			.trim();

        
        // let filteredallPubs =this.state.allPubs.filter(
        //     (allPubs) =>{
        //         return allPubs.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !==-1
        //     }
        // )

        let filteredCurentPubs = currentPubs.filter(
            (allPubs) =>{
                console.log("Ovo su curentPubs  iz let filetredCurentPubs" + JSON.stringify(currentPubs))
                return allPubs.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !==-1
            }
           
        )

        
        return (
            <div>
                 <h2 className="text-center">Publisher List</h2>
                 <div className="row">

            
                 <input  style={{width:150}} type="text" placeholder="Search name" value={this.state.search} onChange={this.updateSearch.bind(this)}/>

                 <button className="sort-by" onClick={ this.toggleSortID}>Sort</button>
                 <button className="btn btn-primary" onClick={this.addPublisher}>Add Publisher</button>
                 </div>

                 <div className="row">
                 <table className="table table-striped table-bordered">
                     <thead>
                         <tr>
                             <th>ID</th>
                             <th>Name</th>
                             <th>Address</th>
                             <th>Contact</th>
                             <th>Actions</th>
                         </tr>

                     </thead>
                     <tbody>
                         {
                             
                         filteredCurentPubs.map(
                                  
                                 publisher=>
                                 <tr key={publisher.id}>
                                     <td>{publisher.id}</td>
                                     <td>{publisher.name}</td>
                                     <td>{publisher.address}</td>
                                     <td>{publisher.contact}</td>
                                     <td>
                                         <button onClick={ () => this.editPublisher(publisher.id)} className="btn btn-info">Update</button>
                                         <button style={{marginLeft:"10px"}} onClick={ () => this.deletePublisher(publisher.id)} className="btn btn-danger">Delete</button>

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
									{totalPubs}
								</strong>{" "}
								Publishers
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
								totalRecords={totalPubs}
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


export default ListPublisherComp;