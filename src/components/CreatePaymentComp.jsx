import React, { Component } from 'react';
import Select from 'react-select';
import axios from 'axios';
import PaymentService from '../services/PaymentService';

class CreatePaymentComp extends Component {
    constructor(props){
        super(props)
        this.state ={
            amount:'',
            paydate:'',
            employeeid:'',
            memcardid:''
        }
        this.changeAmountHandler = this.changeAmountHandler.bind(this);
        this.changePaydateHandler = this.changePaydateHandler.bind(this);
            
        }


        changeAmountHandler=(event)=>{
            this.setState({amount:event.target.value});
        }
    
        changePaydateHandler=(event)=>{
            this.setState({paydate:event.target.value});
        }
    

        savePayment =(e)=>{
            e.preventDefault();
            let payment = {amount:this.state.amount, paydate:this.state.paydate, employeeid:this.state.employeeid, memcardid:this.state.memcardid};
            console.log("book=>" +JSON.stringify(payment));
            
    
            PaymentService.createPayment(payment).then(res => {
                this.props.history.push('/payment');
            }).catch((error)=>{
                console.log(error.message);
            });
        
        }
    
        cancel(){
            this.props.history.push('/payment');
        }
    


    render() {
        return (
            <div>

                  <div className="container">
                       <div className="row">
                            <div className="card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Add Payment</h3>
                                    <div className="card-body">
                                         <form>

                                         <div className="form-group">
                                                 <label>Amount</label>
                                                 <input placeholder="Amount" name="amount" className="form-control"
                                                 value1={this.state.amount} onChange={this.changeAmountHandler}/>                                
                                             </div>

                                             <div className="form-group">
                                                 <label>Paydate</label>
                                                 <input placeholder="Paydate" type='date' name="paydate" className="form-control"
                                                 value2={this.state.paydate} onChange={this.changePaydateHandler}/>                                
                                             </div>

                                             
                                             <label>Employee</label>
                                             <div>
                                                <Select options={this.state.selectEmployees} value3={this.state.employeeid}  onChange={this.handleEmployeeChange.bind(this)} />
                                            </div>


                                            <div>
                                                <label>Membership card</label>
                                                <Select options={this.state.selectMemCards} value4={this.state.memcardid}  onChange={this.handleMemCardsChange.bind(this)} />
                                            </div>


                                           

                                             
                                                                                         
                                             <button className="btn btn-success" onClick={this.savePayment}>Save</button>

                                            <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>

                                         </form>
                                    </div>

                            </div>
                       </div>
                  </div>
                
                
                
            </div>
        );
    }


    async getListOfEmployees(){
        const res = await axios.get('http://localhost:8080/employee')
        const data =res.data

        const employees = data.map(e=>({
            "value":e.id,
            "label":e.name +" "+e.surname +" " +e.email
        }))
        this.setState({selectEmployees:employees})
    }
    handleEmployeeChange(e){
        this.setState({employeeid:e.value, name:e.label})
    }
    async getListOfMemCards(){
        const res= await axios.get('http://localhost:8080/membershipCard')
        const data = res.data


        const memCards= data.map(m=>({
            "value":m.id,
            "label":m.reader.name + " " + m.reader.surname +" " +m.reader.jmbg
        }))
        this.setState({selectMemCards:memCards})
    }
    handleMemCardsChange(e){
        this.setState({memcardid:e.value,name:e.label})

    }

    componentDidMount(){
        this.getListOfEmployees();
        this.getListOfMemCards();
    }
}

export default CreatePaymentComp;