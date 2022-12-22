import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class Registration extends Component {
    constructor(props){
        super(props)
        this.state ={
         name: '',
         surname:'',
         address:'',
         contact:'',
         jbmg:'',
         email:'',
         username:'',
         password:''  
        }
        
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeSurnameHandler = this.changeSurnameHandler.bind(this);
        this.changeJMBGHandler = this.changeJMBGHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changeAddressHandler = this.changeAddressHandler.bind(this);
        this.changeContactHandler = this.changeContactHandler.bind(this);
        this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);

    }

    changeNameHandler=(event)=>{
        this.setState({name:event.target.value});
    }

    changeSurnameHandler=(event)=>{
        this.setState({surname:event.target.value});
    }

    changeJMBGHandler=(event)=>{
        this.setState({jbmg:event.target.value});
    }

    changeEmailHandler=(event)=>{
        this.setState({email:event.target.value});
    }

    changeAddressHandler=(event)=>{
        this.setState({address:event.target.value});
    }

    changeContactHandler=(event)=>{
        this.setState({contact:event.target.value});
    }

    changeUsernameHandler=(event)=>{
        this.setState({username:event.target.value});
    }

    changePasswordHandler=(event)=>{
        this.setState({password:event.target.value});
    }

    saveEmployee =(e)=>{
        e.preventDefault();
        let employee = {name:this.state.name,surname:this.state.surname, address:this.state.address, contact:this.state.contact, jbmg:this.state.jbmg,
            email:this.state.email, username:this.state.username, password:this.state.password };
        console.log("employee=>" +JSON.stringify(employee));

        EmployeeService.createEmployee(employee).then(res => {
            this.props.history.push('/employee');
        }).catch((error)=>{
            console.log(error.message);
        });
    
    }
    cancel(){
        this.props.history.push('/bookTableForUser');
    }



    render() {
        return (
            <div>
                <div className="container">
                       <div className="row">
                            <div className="card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Registration</h3>
                                    <div className="card-body">
                                         <form>

                                         <div className="form-group">
                                                 <label>Name</label>
                                                 <input placeholder="Name" name="name" className="form-control"
                                                 value={this.state.name} onChange={this.changeNameHandler}/>                                
                                             </div>

                                             <div className="form-group">
                                                 <label>Surname</label>
                                                 <input placeholder="Surname" name="surname" className="form-control"
                                                 value={this.state.surname} onChange={this.changeSurnameHandler}/>                                
                                             </div>
                                             <div className="form-group">
                                                 <label>JMBG</label>
                                                 <input placeholder="JMBG" name="jmbg" className="form-control"
                                                 value={this.state.jbmg} onChange={this.changeJMBGHandler}/>                                
                                             </div>

                                             <div className="form-group">
                                                 <label>Email</label>
                                                 <input placeholder="Email" name="email" className="form-control"
                                                 value={this.state.email} onChange={this.changeEmailHandler}/>                                
                                             </div>

                                             <div className="form-group">
                                                 <label>Address</label>
                                                 <input placeholder="Address" name="address" className="form-control"
                                                 value={this.state.address} onChange={this.changeAddressHandler}/>                                
                                             </div>

                                             <div className="form-group">
                                                 <label>Contact</label>
                                                 <input placeholder="Contact" name="contact" className="form-control"
                                                 value={this.state.contact} onChange={this.changeContactHandler}/>                                
                                             </div>

                                             <div className="form-group">
                                                 <label>Username</label>
                                                 <input placeholder="Username" name="username" className="form-control"
                                                 value={this.state.username} onChange={this.changeUsernameHandler}/>                                
                                             </div>

                                             <div className="form-group">
                                                 <label>Password</label>
                                                 <input placeholder="Password" name="password" className="form-control"
                                                 value={this.state.password} onChange={this.changePasswordHandler}/>                                
                                             </div>
                                             
                                            
                                             <button className="btn btn-success" onClick={this.saveEmployee}>Save</button>

                                            <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>

                                         </form>
                                    </div>

                            </div>
                       </div>
                  </div>
                
            </div>
        );
    }
}

export default Registration;