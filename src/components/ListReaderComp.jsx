import React, { Component } from 'react';
import ReaderService from '../services/ReaderService';
import Pagination from './Pagination';

class ListReaderComp extends Component {
    constructor(props){
        super(props)
        this.state = {
            readers:[],
            search: "",
            isOldestFirst: true,

             /**Paginacija */
           
             currentReaders: [],
             currentPage: null,
             totalPages: null
 
             /**Paginacija */
            
        }
        
          this.addReader = this.addReader.bind(this);
          this.editReader = this.editReader.bind(this);
          this.toggleSortID=this.toggleSortID.bind(this);
          this.toggleListReverse=this.toggleListReverse.bind(this);
    }

    
    componentDidMount(){
        ReaderService.getReaders().then((res)=>{
            this.setState({readers:res.data});
        });
        }

        
    addReader(){
        this.props.history.push("/add-Reader");
    }

    editReader(id){
        this.props.history.push(`/update-reader/${id}`);
    }


    updateSearch(event){
        this.setState({search: event.target.value.substr(0,20)})
    }
    toggleSortID(){
        this.sortByID();
    }

    sortByID(){
        const {readers} = this.state
        let newReaders = readers.reverse();
        if(this.state.isOldestFirst){
            newReaders  = readers.sort((a,b)=>a.id > b.id ? 1:-1)

        }else{
            newReaders  = readers.sort((a,b)=>a.id < b.id ? 1:-1)
        }
        this.setState({
            isOldestFirst: !this.state.isOldestFirst,
            readers: newReaders
        })
    }

    
    toggleListReverse(event){
        const {readers} = this.state
        let newReaders = readers.reverse();
        this.setState({
            readers: newReaders
        })
        }

        componentDidMountSort(){

            const readers=ListReaderComp
            this.setState({
                isOldestFirst:true,
                readers: readers
            }) 
        }

        deleteReader(id){
            ReaderService.deleteReader(id).then(res =>{
                this.setState({readers:this.state.readers.filter(reader => reader.id !== id)});
            })
    
        }

            /**Paginacija */


      onPageChanged = data => {
		const { readers } = this.state;
        // <PublisherExport genres={allPubs} />
		const { currentPage, totalPages, pageLimit } = data;

		const offset = (currentPage - 1) * pageLimit;
		const currentReaders = readers.slice(offset, offset + pageLimit);

		this.setState({ currentPage, currentReaders, totalPages });
        console.log("Ovo je iz onPageChanged iz ListPublisherComp" + JSON.stringify(currentReaders))
	};


      /**Paginacija */




    render() {
        const {
			readers,
			currentReaders,
			currentPage,
			totalPages
		} = this.state;
		const totalReaders = readers.length;

		if (totalReaders === 0) return null;

		const headerClass = [
			"text-dark py-2 pr-4 m-0",
			currentPage ? "border-gray border-right" : ""
		]
			.join(" ")
			.trim();


        let filteredReaders =currentReaders.filter(
            (readers) =>{
                return readers.address.toLowerCase().indexOf(this.state.search.toLowerCase()) !==-1
            }
        )
       
        return (
            <div>
                <h2 className="text-center">Readers List</h2>
                 <div className="row">
                 <input  style={{width:150}} type="text" placeholder="Search address" value={this.state.search} onChange={this.updateSearch.bind(this)}/>
                 <button className="sort-by" onClick={ this.toggleSortID}>Sort</button>
                 <button className="btn btn-primary" onClick={this.addReader}>Add Reader</button>
                 </div>

                 <div className="row">
                 <table className="table table-striped table-bordered">
                     <thead>
                         <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>JMBG</th>
                            <th>Address</th>
                            <th>Contact</th>
                                    
                         </tr>

                     </thead>
                     <tbody>
                         {
                             filteredReaders.map(
                                reader=>
                                 <tr key={reader.id}>
                                     <td>{reader.id}</td>
                                     <td>{reader.name}</td>
                                     <td>{reader.surname}</td>
                                     <td>{reader.jmbg}</td>
                                     <td>{reader.address}</td>
                                     <td>{reader.contact}</td>
                                     <td>
                                         <button onClick={ () => this.editReader(reader.id)} className="btn btn-info">Update</button>
                                         <button style={{marginLeft:"10px"}} onClick={ () => this.deleteReader(reader.id)} className="btn btn-danger">Delete</button>

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
									{totalReaders}
								</strong>{" "}
								Readers
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
								totalRecords={totalReaders}
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

export default ListReaderComp;