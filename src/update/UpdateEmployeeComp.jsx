import React, { Component } from 'react';
import EmployeeSevice from '../services/EmployeeService';


class UpdateEmployeeComp extends Component {
    constructor(props){
        super(props)
        this.state ={
            id: this.props.match.params.id,//uzimam id iz rute
            address:'',
            contact:'',
            jbmg:'',
            name:'',
            password:'',
            surname:'',
            username:'',
            email:'' 
        }
       this.changeNameHandler = this.changeNameHandler.bind(this);
       this.changeSurnameHandler = this.changeSurnameHandler.bind(this);
       this.changeAddressHandler = this.changeAddressHandler.bind(this);
       this.changeJMBGHandler = this.changeJMBGHandler.bind(this);
       this.changeContactHandler = this.changeContactHandler.bind(this);
       this.changePasswordHandler = this.changePasswordHandler.bind(this);
       this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
       this.changeEmailHandler = this.changeEmailHandler.bind(this);
       this.updateEmployee = this.updateEmployee.bind(this);
    }

    componentDidMount(){
        EmployeeSevice.getEmployeeById(this.state.id).then((res) =>{
            let employee = res.data;
            this.setState({address: employee.address,
                contact: employee.contact,jbmg:employee.jbmg,name:employee.name,password:employee.password,
                surname:employee.surname,username:employee.username,email:employee.email
            });

        });
    }
    
    changeNameHandler=(event)=>{
        this.setState({name:event.target.value});
    }

    changeSurnameHandler=(event)=>{
        this.setState({surname:event.target.value});
    }

    changeAddressHandler=(event)=>{
        this.setState({address:event.target.value});
    }

    changeContactHandler=(event)=>{
        this.setState({contact:event.target.value});
    }

    changeEmailHandler=(event)=>{
        this.setState({email:event.target.value});
    }

    changeJMBGHandler=(event)=>{
        this.setState({jmbg:event.target.value});
    }

    changePasswordHandler=(event)=>{
        this.setState({password:event.target.value});
    }

    changeUsernameHandler=(event)=>{
        this.setState({username:event.target.value});
    }

    updateEmployee =(e)=>{
        e.preventDefault();
        let employee = {address:this.state.address, contact:this.state.contact,jmbg:this.state.contact,
        name:this.state.name, password:this.state.password,surname:this.state.surname,username:this.state.username,email:this.state.email};
        console.log("author=>" +JSON.stringify(employee));

        EmployeeSevice.getEmployeeById(employee,this.state.id).then(res => {
            this.props.history.push('/employee');
        });
    
    }

    cancel(){
        this.props.history.push('/employee');
    }
    render() {
        return (
            <div>
                 <div className="container">
                       <div className="row">
                            <div className="card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update Employee</h3>
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
                                                 <label>JMBG</label>
                                                 <input placeholder="Jmbg" name="jmbg" className="form-control"
                                                 value={this.state.jmbg} onChange={this.changeJMBGHandler}/>                                
                                             </div>

                                             <div className="form-group">
                                                 <label>Username</label>
                                                 <input placeholder="Username" name="username" className="form-control"
                                                 value={this.state.username} onChange={this.changeUsernameHandler}/>                                
                                             </div>

                                             <div className="form-group">
                                                 <label>Email</label>
                                                 <input placeholder="Email" name="email" className="form-control"
                                                 value={this.state.email} onChange={this.changeEmailHandler}/>                                
                                             </div>

                                             <div className="form-group">
                                                 <label>Password</label>
                                                 <input placeholder="Password" name="pasword" className="form-control"
                                                 value={this.state.password} onChange={this.changePasswordHandler}/>                                
                                             </div>


                                             
                                            
                                             <button className="btn btn-success" onClick={this.updateEmployee}>Save</button>

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

export default UpdateEmployeeComp;