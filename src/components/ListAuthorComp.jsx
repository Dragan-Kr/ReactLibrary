import React, { Component } from "react";
import AuthorService from "../services/AuthorService";
// import AuthorExport from "./forUser/AuthorExport";
import Pagination from "./Pagination";
// import ReactPaginate from 'react-paginate';
// import Paginator from "./Paginator";
// import { withRouter } from "react-router";
// import { Slide } from "@material-ui/core";
// import { withStyles } from '@material-ui/core/styles';

// import Icon from '@material-ui/icons/DeleteRounded'
// import IconEdit from '@material-ui/icons/EditRounded'
// import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
// import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
// import Add from '@material-ui/icons/AddBoxRounded';

// const columnHeader =  [
//     {
//       alias:"ID", property:"id"
//     },
//     {
//         alias:"Name", property:"name"
//     },
//     {
//         alias:"Surname", property:"surname"
//     }

// ];

// const Transition = React.forwardRef(function Transition(props, ref) {
// 	return <Slide direction="up" ref={ref} {...props} />;
// });

class ListAuthorComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authors: [],
      search: "",
      isOldestFirst: true,

      tableData: [],
      offset: 0,

       /**Paginacija */
           
       currentAuthors: [],
       currentPage: null,
       totalPages: null

       /**Paginacija */


    
     
    };
    this.addAuthor = this.addAuthor.bind(this);
    this.editAuthor = this.editAuthor.bind(this);
    this.deleteAuthor = this.deleteAuthor.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.toggleSortID = this.toggleSortID.bind(this);
    this.toggleListReverse = this.toggleListReverse.bind(this);

    // this.sortByID = this.sortByID.bind(this);

    //  this.loadMoreData = this.loadMoreData.bind(this);
    //this.authorHeader = this.authorHeader.bind(this);
  }

  deleteAuthor(id) {
    AuthorService.deleteAuthor(id).then((res) => {
      this.setState({
        authors: this.state.authors.filter((author) => author.id !== id),
      });
    });
  }

  editAuthor(id) {
    this.props.history.push(`/update-author/${id}`);
  }

  addAuthor() {
    this.props.history.push("/add-Author");
  }

  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20) });
  }
  toggleSortID() {
    this.sortByID();
  }

  sortByID() {
    const { authors } = this.state;
    let newAuthors = authors.reverse();
    if (this.state.isOldestFirst) {
      newAuthors = authors.sort((a, b) => (a.id > b.id ? 1 : -1));
    } else {
      newAuthors = authors.sort((a, b) => (a.id < b.id ? 1 : -1));
    }
    this.setState({
      isOldestFirst: !this.state.isOldestFirst,
      authors: newAuthors,
    });
  }

  toggleListReverse(event) {
    const { authors } = this.state;
    let newAuthors = authors.reverse();
    this.setState({
      authors: newAuthors,
    });
  }

  componentDidMountSort() {
    const authors = ListAuthorComp;
    this.setState({
      isOldestFirst: true,
      authors: authors,
    });
  }

  componentDidMount() {
   
    AuthorService.getAuthors()
      .then((res) => {
        
        this.setState({ authors: res.data }); //ovo aman ne treba
       
      })

      .catch(function (error) {
        console.log(error);
      });
  }

  // componentDidUpdate(previousProps, previousState) {
  //   //ovo je bitno
  //   if (previousState.currentPage !== this.state.currentPage) {
  //     const indexOfLast = this.state.currentPage * this.state.moviesPerPage;
  //     const indexOfFirst = indexOfLast - this.state.moviesPerPage;
  //     this.setState({
  //       sliceMovies: this.state.authors.slice(indexOfFirst, indexOfLast),
  //     });
  //   }
  // }

  handlePaginate = (event, page) => {
    console.log("Ovo bi trebalo biti stranica: " + page);
    this.setState({ currentPage: page });
  };

 
   /**Paginacija */


   onPageChanged = data => {
		const { authors } = this.state;
        // <PublisherExport genres={allPubs} />
		const { currentPage, totalPages, pageLimit } = data;

		const offset = (currentPage - 1) * pageLimit;
		const currentAuthors = authors.slice(offset, offset + pageLimit);

		this.setState({ currentPage, currentAuthors, totalPages });
        console.log("Ovo je iz onPageChanged iz ListPublisherComp" + JSON.stringify(currentAuthors))
	};


      /**Paginacija */





  render() {
   
    const {
			authors,
			currentAuthors,
			currentPage,
			totalPages
		} = this.state;
		const totalAuthors = authors.length;

		if (totalAuthors === 0) return null;

		const headerClass = [
			"text-dark py-2 pr-4 m-0",
			currentPage ? "border-gray border-right" : ""
		]
			.join(" ")
			.trim();

    let filteredAuthors =currentAuthors.filter((authors) => {
      // this.console.log("Ovo su currentAuth " + JSON.stringify(currentAuth))
      return (
        authors.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
        -1
      );
    });
    console.log(
      "Ovo je filteredAuthors iz ListAuthorComp" +
        JSON.stringify(this.state.filteredAuthors)
    );
   

    return (
      <div className="App">
        <h2 className="text-center">Author List</h2>
        <div className="row">
          <input
          style={{width:150}}
            type="text"
            placeholder="Search..."
            value={this.state.search}
            onChange={this.updateSearch.bind(this)}
          />
          <button className="sort-by" onClick={this.toggleSortID}>
            Sort
          </button>
          <button className="btn btn-primary" onClick={this.addAuthor}>
            Add Author
          </button>
        </div>

        <div className="row">
          <table  className="table table-striped table-bordered">
            {/* { this.authorHeader() } */}

            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Surname</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredAuthors.map((author) => (
                <tr key={author.id}>
                  <td>{author.id}</td>
                  <td>{author.name}</td>
                  <td>{author.surname}</td>
                  <td>
                    <button
                      onClick={() => this.editAuthor(author.id)}
                      className="btn btn-info"
                    >
                      Update
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => this.deleteAuthor(author.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
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
									{totalAuthors}
								</strong>{" "}
								Authors
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
								totalRecords={totalAuthors}
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

export default ListAuthorComp;
// export default withRouter(ListAuthorComp);
