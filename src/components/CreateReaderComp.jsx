import React, { Component } from 'react';
import ReaderService from '../services/ReaderService';

class CreateReaderComp extends Component {
    constructor(props){
        super(props)
        this.state ={
            id: '',
            name: '',
            surname:'',
            jmbg:'',
            address: '',
            contact: ''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeSurnameHandler = this.changeSurnameHandler.bind(this);
        this.changeJMBGHandler = this.changeJMBGHandler.bind(this);
        this.changeAddressHandler = this.changeAddressHandler.bind(this);
        this.changeContactHandler = this.changeContactHandler.bind(this);

    }
        changeNameHandler=(event)=>{
            this.setState({name:event.target.value});
            
        }

        changeSurnameHandler=(event)=>{
            this.setState({surname:event.target.value});
        }

        changeJMBGHandler=(event)=>{
            this.setState({jmbg:event.target.value});
        }

        changeAddressHandler=(event)=>{
            this.setState({address:event.target.value});
        }

        changeContactHandler=(event)=>{
            this.setState({contact:event.target.value});
        }

        saveReader =(e)=>{
            e.preventDefault();
            let reader = {name:this.state.name, surname:this.state.surname, jmbg:this.state.jmbg,  address:this.state.address, contact:this.state.contact}
            console.log("reader=>" +JSON.stringify(reader));
    
            ReaderService.createReader(reader).then(res => {
                this.props.history.push('/reader');
            }).catch((error)=>{
                console.log(error.message);
            });
        
        }

        cancel(){
            this.props.history.push('/reader');
        }



    render() {
        return (
            <div>
                <div className="container">
                       <div className="row">
                            <div className="card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Add Reader</h3>
                                    <div className="card-body">
                                         <form>

                                         <div className="form-group">
                                                 <label>Name</label>
                                                 <input placeholder="Name" name="name" className="form-control"
                                                 value1={this.state.name} onChange={this.changeNameHandler}/>                                
                                             </div>

                                             <div className="form-group">
                                                 <label>Surname</label>
                                                 <input placeholder="Surname" name="surname" className="form-control"
                                                 value2={this.state.surname} onChange={this.changeSurnameHandler}/>                                
                                             </div>

                                             <div className="form-group">
                                                 <label>JMBG</label>
                                                 <input placeholder="JMBG" name="jmbg" className="form-control"
                                                 value3={this.state.jmbg} onChange={this.changeJMBGHandler}/>                                
                                             </div>

                                             <div className="form-group">
                                                 <label>Address</label>
                                                 <input placeholder="Address" name="address" className="form-control"
                                                 value4={this.state.address} onChange={this.changeAddressHandler}/>                                
                                             </div>


                                             <div className="form-group">
                                                 <label>Contact</label>
                                                 <input placeholder="Contact" name="contact" className="form-control"
                                                 value5={this.state.contact} onChange={this.changeContactHandler}/> 
                                             </div>
                                            
                                             <button className="btn btn-success" onClick={this.saveReader}>Save</button>

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

export default CreateReaderComp;