import React, { Component } from 'react';
import GenreService from '../services/GenreService';
import Pagination from './Pagination';






// import ReactDOM from "react-dom";

// import ReactTable from "react-table";
import "react-table-6/react-table.css";
// import Paginator from './Paginator';
// import "./styles.css";



class ListGenreComp extends Component {

    constructor(props){
        super(props)
        this.state = {
            genres:[],
            search: "",
            isOldestFirst: true,


             /**Paginacija */
           
             currentGenres: [],
             currentPage: null,
             totalPages: null
 
             /**Paginacija */





            
        }
        this.addGenre = this.addGenre.bind(this);
        this.editGenre = this.editGenre.bind(this);
        
        this.toggleSortID = this.toggleSortID.bind(this);
       // this.sortByID = this.sortByID.bind(this);
        this.toggleListReverse = this.toggleListReverse.bind(this);
        this.deleteGenre = this.deleteGenre.bind(this);
          
    }



    
       editGenre(id){
        this.props.history.push(`/update-genre/${id}`);//vodje sam zamjenio update sa add

        }
       componentDidMount(){
        GenreService.getGenres().then((res)=>{
            this.setState({genres:res.data});
           
        });

        }

        addGenre(genre){
            this.props.history.push('/add-Genre');
        }


        updateSearch(event){
            this.setState({search: event.target.value.substr(0,20)})
        }

        toggleSortID(event){
            this.sortByID();
        }


        sortByID(event){
            const {genres} = this.state
            console.log("genres:", +JSON.stringify(genres));
            let newGenres = genres.reverse();
           
            if(this.state.isOldestFirst){
                newGenres  = genres.sort((a,b)=>a.id > b.id ? 1:-1)
               

            }else{
                newGenres  = genres.sort((a,b)=>a.id < b.id ? 1:-1)
            }
            this.setState({
                isOldestFirst: !this.state.isOldestFirst,
                genres: newGenres
              
            })
        }

     
        toggleListReverse(event){
            const {genres} = this.state
            let newGenres = genres.reverse();
          
            this.setState({
                genres: newGenres
            })
        }


        componentDidMountSort(){

            const genres=ListGenreComp
            this.setState({
                isOldestFirst:true,
                genres: genres
            }) 
        }


        deleteGenre(id){
            GenreService.deleteGenre(id).then(res =>{
                this.setState({genres:this.state.genres.filter(genre => genre.id !== id)});
            })
    
        }





              /**Paginacija */


      onPageChanged = data => {
		const { genres } = this.state;
        // <PublisherExport genres={allPubs} />
		const { currentPage, totalPages, pageLimit } = data;

		const offset = (currentPage - 1) * pageLimit;
		const currentGenres = genres.slice(offset, offset + pageLimit);

		this.setState({ currentPage, currentGenres, totalPages });
        console.log("Ovo je iz onPageChanged iz ListPublisherComp" + JSON.stringify(currentGenres))
	};


      /**Paginacija */


    render() {

        const {
			genres,
			currentGenres,
			currentPage,
			totalPages
		} = this.state;
		const totalGenres = genres.length;

		if (totalGenres === 0) return null;

		const headerClass = [
			"text-dark py-2 pr-4 m-0",
			currentPage ? "border-gray border-right" : ""
		]
			.join(" ")
			.trim();

        let filteredGenres =currentGenres.filter(
            (genres) =>{
                return genres.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !==-1
            }
        )
    
        console.log("filteredGenres=>" +JSON.stringify(filteredGenres));


        return (
            <div>
                 <h2 className="text-center">Genre List</h2>
                 <div className="row">
                 

                 <input style={{width:150}} type="text" placeholder="Search name" value={this.state.search} onChange={this.updateSearch.bind(this)}/>
                 <button className="sort-by" onClick={ this.toggleSortID}>Sort</button>
                 <button className="btn btn-primary" onClick={this.addGenre}>Add Genre</button>
                 </div>

                 <div className="row">
                 <table className="table table-striped table-bordered">
                     <thead>
                         <tr>
                             <th>ID</th>
                             <th>Name</th>
                             <th>Actions</th>
                             
                         </tr>

                     </thead>
                     <tbody>
                         {
                             filteredGenres.map(
                                 genre=>
                                 <tr key={genre.id}>
                                    <td>{genre.id}</td>
                                     <td>{genre.name}</td>
                                     <td>
                                         <button onClick={ () => this.editGenre(genre.id)} className="btn btn-info">Update</button>
                                         <button style={{marginLeft:"10px"}} onClick={ () => this.deleteGenre(genre.id)} className="btn btn-danger">Delete</button>

                                     </td>
                                 </tr>
                             )
                         }
                     </tbody>
                 </table>
                 {/* <Paginator sorted={filteredGenres} /> */}
                 </div>

                    {/* Paginacija */}
                    <div className="container mb-5">
				<div className="row d-flex flex-row py-5">
					<div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
						<div className="d-flex flex-row align-items-center">
							<h2 className={headerClass}>
								<strong className="text-secondary">
									{totalGenres}
								</strong>{" "}
								Genres
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
								totalRecords={totalGenres}
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

 
export default ListGenreComp;
