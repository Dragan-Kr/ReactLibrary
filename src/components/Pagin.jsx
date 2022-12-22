import React, { Component } from "react";
// import Countries from "countries-api/lib/data/Countries.json";
import Pagination from  "./Pagination"
// import CountryCard from "./components/CountryCard";
import PublisherService from '../services/PublisherService';


class Pagin extends Component {
	state = {
		allPubs: [],
		currentPubs: [],
		currentPage: null,
		totalPages: null
	};

	componentDidMount() {
        
        PublisherService.getPublishers().then((res)=>{
        const allPubs =res.data
        this.setState({ allPubs });
        });
		// const allPubs = Countries;
		// this.setState({ allPubs });
	}

	onPageChanged = data => {
		const { allPubs } = this.state;
		const { currentPage, totalPages, pageLimit } = data;

		const offset = (currentPage - 1) * pageLimit;
		const currentPubs = allPubs.slice(offset, offset + pageLimit);

		this.setState({ currentPage, currentPubs, totalPages });
	};

	render() {
		const {
			allPubs,
			// currentPubs,
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

		return (
			<div className="container mb-5">
				<div className="row d-flex flex-row py-5">
					<div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
						<div className="d-flex flex-row align-items-center">
							<h2 className={headerClass}>
								<strong className="text-secondary">
									{totalPubs}
								</strong>{" "}
								Countries
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
								totalRecords={totalPubs}
								pageLimit={2} 
								pageNeighbours={1}
								onPageChanged={this.onPageChanged}
							/>
						</div>
					</div>
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
                             this.state.currentPubs.map(
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
			</div>
		);
	}
}

export default Pagin;
