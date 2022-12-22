// import JsonData from "./MOCK_DATA.json";
// import React, { useState } from "react";
import React from "react";

// import ReactPaginate from "react-paginate";

// function Paginator(props) {
//   console.log("Ovo je props iz paginatora" + JSON.stringify(props.value))
//   const [users, setUsers] = useState(props.toString().slice(0, 50));
//   const [users] = useState(JSON.stringify(props.data))
//   const [pageNumber, setPageNumber] = useState(0);

//   const usersPerPage = 2;
//   const pagesVisited = pageNumber * usersPerPage;

//   const displayUsers = users.toString()
//     .slice(pagesVisited, pagesVisited + usersPerPage)
//     .map((user) => {
//       return (
//       <div>
//         <p>Nesto</p>
//       </div>
//       );
//     });

//   const pageCount = Math.ceil(users.length / usersPerPage);

//   const changePage = ({ selected }) => {
//     setPageNumber(selected);
//   };

//   return (
//     <div className="App">
//       {displayUsers}
//       <ReactPaginate
//         previousLabel={"Previous"}
//         nextLabel={"Next"}
//         pageCount={pageCount}
//         onPageChange={changePage}
//         containerClassName={"paginationBttns"}
//         previousLinkClassName={"previousBttn"}
//         nextLinkClassName={"nextBttn"}
//         disabledClassName={"paginationDisabled"}
//         activeClassName={"paginationActive"}
//       />
//     </div>
//   );
// }

// export default Paginator;


import Pagination from '@material-ui/lab/Pagination';


export default function Paginate({ moviesPerPage, totalMovies, paginate }) {
	const pageNumber = [];

	for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
		pageNumber.push(i);
	}
	return (
		<div>
			<Pagination count={pageNumber.length} onChange={paginate} />
		</div>
	);
}
