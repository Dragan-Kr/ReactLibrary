import React, { Component } from 'react';
import Select from 'react-select';
import axios from 'axios';
import RentService from '../services/RentService';


class UpdateRentComp extends Component {
    constructor(props){
        super(props)
        this.state ={
            id:this.props.match.params.id,
            rentdate:'',
            returndate:'',
            bookid:'',
            empid:'',
            memcardid:''
        }
       this.changeRentDateHandler = this.changeRentDateHandler.bind(this);
       this.changeReturnDateHandler = this.changeReturnDateHandler.bind(this);
    }


   componentDidMount(){
       RentService.getRentById(this.state.id).then((res) =>{
        let rent = res.data;
        this.setState({rentdate: rent.rentdate,returndate:rent.returndate,bookid:rent.bookid,
            empid:rent.empid, memcardid:rent.memcardid  
           
        });

    });

       }
   

    changeRentDateHandler=(event)=>{
        this.setState({rentdate:event.target.value});
    }

    changeReturnDateHandler=(event)=>{
        this.setState({returndate:event.target.value});
    }


    updateRent =(e)=>{
        e.preventDefault();
        let rent = {rentdate:this.state.rentdate, returndate:this.state.rentdate, bookid:this.state.bookid, empid:this.state.empid, memcardid:this.state.memcardid };
        console.log("rent=>" +JSON.stringify(rent));
        

        RentService.updateRent(rent,this.state.id).then(res => {
            this.props.history.push('/rent');
        });
    
    }

    cancel(){
        this.props.history.push('/rent');
    }




    render() {
        return (
            <div>
                 <div className="container">
                       <div className="row">
                            <div className="card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update Rent</h3>
                                    <div className="card-body">
                                         <form>

                                         <div className="form-group">
                                                 <label>Rent Date</label>
                                                 <input placeholder="Rent Date" type='date' name="rentdate" className="form-control"
                                                 value1={this.state.rentdate} onChange={this.changeRentDateHandler}/>                                
                                             </div>

                                             <div className="form-group">
                                                 <label>Return Date</label>
                                                 <input placeholder="Return Date" type='date' name="returndate" className="form-control"
                                                 value2={this.state.returndate} onChange={this.changeReturnDateHandler}/>                                
                                             </div>

                                             <div>
                                                 <label>Book</label>
                                                <Select options={this.state.SelectBooks} value3={this.state.bookid}  onChange={this.handleBookChange.bind(this)} />
                                            </div>

                                            <div>
                                                <label>Employee</label>
                                                <Select options={this.state.SelectEmployees} value4={this.state.empid}  onChange={this.handleEmployeeChange.bind(this)} />
                                            </div>

                                            <div>
                                                <label>Membership card</label>
                                                <Select options={this.state.SelectMemCards} value5={this.state.memcardid}  onChange={this.handleMemCardsChange.bind(this)} />
                                            </div>

                                             
                                                                                         
                                             <button className="btn btn-success" onClick={this.updateRent}>Save</button>

                                            <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>

                                         </form>
                                    </div>

                            </div>
                       </div>
                  </div>
                
                
            </div>
        );
    }



    async getListOfBooks(){
        const res= await axios.get('http://localhost:8080/book')
        const data = res.data

        const books= data.map(b=>({
            "value":b.id,
            "label":b.name
        }))
        this.setState({SelectBooks:books})
    }
   
    handleBookChange(e){
        this.setState({bookid:e.value,name:e.label})

    }

    async getListOfEmployees(){
        const res= await axios.get('http://localhost:8080/employee')
        const data = res.data


        const employees= data.map(e=>({
            "value":e.id,
            "label":e.name + " " +e.surname + " " + e.email
        }))
        this.setState({SelectEmployees:employees})
    }
    handleEmployeeChange(e){
        this.setState({empid:e.value,name:e.label})

    }



    async getListOfMemCards(){
        const res= await axios.get('http://localhost:8080/membershipCard')
        const data = res.data


        const memCards= data.map(m=>({
            "value":m.id,
            "label":m.reader.name
        }))
        this.setState({SelectMemCards:memCards})
    }
    handleMemCardsChange(e){
        this.setState({memcardid:e.value,name:e.label})

    }

    componentDidMount(){
        this.getListOfBooks();
        this.getListOfEmployees();
        this.getListOfMemCards();
    }





}

export default UpdateRentComp;