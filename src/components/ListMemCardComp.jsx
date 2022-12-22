import React, { Component } from 'react';
import MemCardService from '../services/MemCardService';
import Pagination from './Pagination';

class ListMemCardComp extends Component {
    constructor(props){
        super(props)
        this.state = {
            memCards:[],
            search: "",
            isOldestFirst: true,

              /**Paginacija */
           
              currentMemCards: [],
              currentPage: null,
              totalPages: null
  
              /**Paginacija */


        }
        this.addMemCard = this.addMemCard.bind(this);
        this.editMemCard = this.editMemCard.bind(this);
        this.deleteMemCard = this.deleteMemCard.bind(this);
        this.toggleSortID=this.toggleSortID.bind(this);
        this.toggleListReverse=this.toggleListReverse.bind(this);
    }

    componentDidMount(){
        MemCardService.getMemCards().then((res)=>{
            this.setState({memCards:res.data});
        });
        }

        addMemCard(memCard){
            this.props.history.push('/add-MemCard');
        }

        editMemCard(id){
            this.props.history.push(`/update-memCard/${id}`);

        }

        updateSearch(event){
            this.setState({search: event.target.value.substr(0,20)})
        }
        toggleSortID(){
            this.sortByID();
        }

        sortByID(){
            const {memCards} = this.state
            let newMemCards = memCards.reverse();
            if(this.state.isOldestFirst){
                newMemCards  = memCards.sort((a,b)=>a.id > b.id ? 1:-1)

            }else{
                newMemCards  = memCards.sort((a,b)=>a.id < b.id ? 1:-1)
            }
            this.setState({
                isOldestFirst: !this.state.isOldestFirst,
                memCards: newMemCards
            })
        }


        toggleListReverse(event){
            const {memCards} = this.state
            let newMemCards = memCards.reverse();
            this.setState({
                memCards: newMemCards
            })
        }


        componentDidMountSort(){

            const memCards=ListMemCardComp
            this.setState({
                isOldestFirst:true,
                memCards: memCards
            }) 
        }


        deleteMemCard(id){
            MemCardService.deleteMemCard(id).then(res =>{
                this.setState({memCards:this.state.memCards.filter(memCard => memCard.id !== id)});
            })
    
        }

        
              /**Paginacija */


      onPageChanged = data => {
		const { memCards } = this.state;
        // <PublisherExport genres={allPubs} />
		const { currentPage, totalPages, pageLimit } = data;

		const offset = (currentPage - 1) * pageLimit;
		const currentMemCards = memCards.slice(offset, offset + pageLimit);

		this.setState({ currentPage, currentMemCards, totalPages });
        console.log("Ovo je iz onPageChanged iz ListPublisherComp" + JSON.stringify(currentMemCards))
	};


      /**Paginacija */






    render() {

        const {
			memCards,
			currentMemCards,
			currentPage,
			totalPages
		} = this.state;
		const totalMemCards = memCards.length;

		if (totalMemCards === 0) return null;

		const headerClass = [
			"text-dark py-2 pr-4 m-0",
			currentPage ? "border-gray border-right" : ""
		]
			.join(" ")
			.trim();

        let filteredMemCards =currentMemCards.filter(
            (memCards) =>{
                return memCards.dateofissue.indexOf(this.state.search) !==-1
            }
        )

        return (
            <div>
                 <h2 className="text-center">Membership card list</h2>
                 <div className="row">
                 <input style={{width:150}} type="text" placeholder="Search date" value={this.state.search} onChange={this.updateSearch.bind(this)}/>
                 <button className="sort-by" onClick={ this.toggleSortID}>Sort</button>
                 <button className="btn btn-primary" onClick={this.addMemCard}>Add Membership card</button>
                 </div>

                 <div className="row">
                 <table className="table table-striped table-bordered">
                     <thead>
                         <tr>
                             <th>ID</th>
                             <th>Date of issue</th>
                             <th>Duration</th>
                             <th>Reader</th>
                             <th>Employee</th>
                             <th>Actions</th>
                         </tr>

                     </thead>
                     <tbody>
                         {
                             filteredMemCards.map(
                                 memCard=>
                                 <tr key={memCard.id}>
                                       <td>{memCard.id}</td>
                                     <td>{memCard.dateofissue}</td>
                                     <td>{memCard.duration}</td>
                                     <td>{memCard.reader.name + " " + memCard.reader.surname}</td>
                                     <td>{memCard.employee.name + " " +memCard.employee.surname }</td>
                                     <td>
                                     <button onClick={ () => this.editMemCard(memCard.id)} className="btn btn-info">Update</button>
                                     <button style={{marginLeft:"10px"}} onClick={ () => this.deleteMemCard(memCard.id)} className="btn btn-danger">Delete</button>

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
									{totalMemCards}
								</strong>{" "}
								Membership Cards
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
								totalRecords={totalMemCards}
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

export default ListMemCardComp;