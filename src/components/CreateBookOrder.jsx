import axios from 'axios';
import React, { Component } from 'react';
import Select from 'react-select';
import BookOrderSevice from '../services/BookOrderSevice';
class CreateBookOrder extends Component {
    constructor(props){
        super(props)
        this.state ={
        id:'',
        booknum:'',
        orderdat:'',
        paymenttype:'',
        bookid:'',
        employeeid:'',
        publisherid:''
        }

        this.changeBookNumHandler = this.changeBookNumHandler.bind(this);
        this.changeOrderDatHandler = this.changeOrderDatHandler.bind(this);
        this.changePaymentTypeHandler = this.changePaymentTypeHandler.bind(this);
       
    }
    changeBookNumHandler=(event)=>{
        this.setState({booknum:event.target.value});
    }

    changeOrderDatHandler=(event)=>{
        this.setState({orderdat:event.target.value});
    }

    changePaymentTypeHandler=(event)=>{
        this.setState({paymenttype:event.target.value});
    }


    
    saveBookOrder =(e)=>{
        e.preventDefault();
        let bookOrder = {booknum:this.state.booknum, orderdat:this.state.orderdat, paymenttype:this.state.paymenttype, bookid: this.state.bookid,employeeid:this.state.employeeid, publisherid:this.state.publisherid};
        console.log("book=>" +JSON.stringify(bookOrder));
        

        BookOrderSevice.createBookOrder(bookOrder).then(res => {
            this.props.history.push('/bookOrder');
        }).catch((error)=>{
            console.log(error.message);
        });
    
    }

    cancel(){
        this.props.history.push('/bookOrder');
    }




    render() {
        return (
            <div>
                 <div className="container">
                       <div className="row">
                            <div className="card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Add Book order</h3>
                                    <div className="card-body">
                                         <form>

                                       

                                             <div className="form-group">
                                                 <label>Number of books</label>
                                                 <input placeholder="Number of books" name="booknum" className="form-control"
                                                 value1={this.state.booknum} onChange={this.changeBookNumHandler}/>                                
                                             </div>

                                             <div className="form-group">
                                                 <label>Order date</label>
                                                 <input placeholder="Date of orders" type ="date" name="orderdat" className="form-control"
                                                 value2={this.state.orderdat} onChange={this.changeOrderDatHandler}/>                                
                                             </div>

                                             <div className="form-group">
                                                 <label>Payment type</label>
                                                 <input placeholder="Type of payment" name="paymenttype" className="form-control"
                                                 value3={this.state.paymenttype} onChange={this.changePaymentTypeHandler}/>                                
                                             </div>

                                             <div>
                                                 <label>Book</label>
                                                <Select options={this.state.SelectBooks} value5={this.state.bookid}  onChange={this.handleBookChange.bind(this)} />
                                            </div>

                                            <div>
                                                <label>Employee</label>
                                                <Select options={this.state.SelectEmployees} value6={this.state.employeeid}  onChange={this.handleEmployeeChange.bind(this)} />
                                            </div>

                                            <div>
                                                <label>Publisher</label>
                                                <Select options={this.state.SelectPublishers} value7={this.state.publisherid}  onChange={this.handlePublisherChange.bind(this)} />
                                            </div>

                                                                                         
                                             <button className="btn btn-success" onClick={this.saveBookOrder}>Save</button>

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
        this.setState({employeeid:e.value,name:e.label})

    }


    async getListOfPublishers(){
        const res= await axios.get('http://localhost:8080/publisher')
        const data = res.data

        const publishers= data.map(p=>({
            "value":p.id,
            "label":p.name +" "+p.address +" " +p.contact
        }))
        this.setState({SelectPublishers:publishers})
    }
    handlePublisherChange(e){
        this.setState({publisherid:e.value,name:e.label})

    }
    componentDidMount(){
        this.getListOfBooks()
        this.getListOfEmployees();
        this.getListOfPublishers();
    }
     
    

}

export default CreateBookOrder;