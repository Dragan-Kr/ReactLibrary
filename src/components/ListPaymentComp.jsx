import React, { Component } from 'react';
import PaymentService from '../services/PaymentService';
import Pagination from './Pagination';

class ListPaymentComp extends Component {
    constructor(props){
        super(props)
        this.state = {
            payments:[],
            search: "",
            isOldestFirst: true,


             /**Paginacija */
           
             currentPayments: [],
             currentPage: null,
             totalPages: null
 
             /**Paginacija */




        }
        this.addPayment = this.addPayment.bind(this);
         this.editPayment = this.editPayment.bind(this);
         this.toggleSortID=this.toggleSortID.bind(this);
         this.toggleListReverse=this.toggleListReverse.bind(this);
    }

    componentDidMount(){
        PaymentService.getPayments().then((res)=>{
            this.setState({payments:res.data});
        });
        }

        addPayment(){
            this.props.history.push("/add-Payment");
        }


        editPayment(id){
            this.props.history.push(`/update-payment/${id}`);
        }


        updateSearch(event){
            this.setState({search: event.target.value.substr(0,20)})
        }
        toggleSortID(){
            this.sortByID();
        }

        sortByID(){
            const {payments} = this.state
            let newPayments = payments.reverse();
            if(this.state.isOldestFirst){
                newPayments  = payments.sort((a,b)=>a.id > b.id ? 1:-1)

            }else{
                newPayments  = payments.sort((a,b)=>a.id < b.id ? 1:-1)
            }
            this.setState({
                isOldestFirst: !this.state.isOldestFirst,
                payments: newPayments
            })
        }

        
        toggleListReverse(event){
            const {payments} = this.state
            let newPayments = payments.reverse();
            this.setState({
                payments: newPayments
            })
        }


        
        componentDidMountSort(){

            const payments=ListPaymentComp
            this.setState({
                isOldestFirst:true,
                payments: payments
            }) 
        }

        deletePayment(id){
            PaymentService.deletePayment(id).then(res =>{
                this.setState({payments:this.state.payments.filter(payment => payment.id !== id)});
            })
    
        }




              /**Paginacija */


              onPageChanged = data => {
                const { payments } = this.state;
                // <PublisherExport genres={allPubs} />
                const { currentPage, totalPages, pageLimit } = data;
        
                const offset = (currentPage - 1) * pageLimit;
                const currentPayments = payments.slice(offset, offset + pageLimit);
        
                this.setState({ currentPage, currentPayments, totalPages });
                console.log("Ovo je iz onPageChanged iz ListPublisherComp" + JSON.stringify(currentPayments))
            };
        
        
              /**Paginacija */


    render() {

        const {
			payments,
			currentPayments,
			currentPage,
			totalPages
		} = this.state;
		const totalPayments = payments.length;

		if (totalPayments === 0) return null;

		const headerClass = [
			"text-dark py-2 pr-4 m-0",
			currentPage ? "border-gray border-right" : ""
		]
			.join(" ")
			.trim();

        let filteredPayments =currentPayments.filter(
            (payments) =>{
                return payments.paydate.indexOf(this.state.search) !==-1
            }
        )

        return (
            <div>
                <h2 className="text-center">Payment List</h2>
                 <div className="row">
                 <input  style={{width:150}} type="text" placeholder="Search date" value={this.state.search} onChange={this.updateSearch.bind(this)}/>
                 <button className="sort-by" onClick={ this.toggleSortID}>Sort</button>
                 <button className="btn btn-primary" onClick={this.addPayment}>Add Payment</button>
                 </div>

                 <div className="row">
                 <table className="table table-striped table-bordered">
                     <thead>
                         <tr>
                             <th>ID</th>
                            <th>Amount</th>
                            <th>Paydate</th>

                            {/* <th>Paydate<a href="#" className="sort-by" onClick={this.toggleSortID}></a></th> */}
                            <th>Employee</th>
                            <th>Membership Card</th>
                            <th>Actions</th>                                   
                         </tr>

                     </thead>
                     <tbody>
                         {
                             filteredPayments.map(
                                payment=>
                                 <tr key={payment.id}>
                                     <td>{payment.id}</td>
                                     <td>{payment.amount}</td>
                                     <td>{payment.paydate}</td>
                                     <td>{payment.employee.name}</td>
                                     <td>{payment.membershipCard.reader.name + " " + payment.membershipCard.reader.surname + " " +payment.membershipCard.reader.jmbg}</td>
                                     <td>
                                         <button onClick={ () => this.editPayment(payment.id)} className="btn btn-info">Update</button>
                                         <button style={{marginLeft:"10px"}} onClick={ () => this.deletePayment(payment.id)} className="btn btn-danger">Delete</button>

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
									{totalPayments}
								</strong>{" "}
								Payments
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
								totalRecords={totalPayments}
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

export default ListPaymentComp;