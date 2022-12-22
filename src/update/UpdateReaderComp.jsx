import React, { Component } from 'react';
import ReaderService from '../services/ReaderService';

class UpdateReaderComp extends Component {
    constructor(props){
        super(props)
        this.state ={
            id: this.props.match.params.id,
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


    componentDidMount(){
        ReaderService.getReaderByID(this.state.id).then((res) =>{
            let reader = res.data;
            this.setState({name: reader.name,
                surname: reader.surname,
                jmbg:reader.jmbg,
                address:reader.address,
                contact:reader.contact
            });

        });
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

        updateReader =(e)=>{
            e.preventDefault();
            let reader = {name:this.state.name, surname:this.state.surname, jmbg:this.state.jmbg,  address:this.state.address, contact:this.state.contact}
            console.log("reader=>" +JSON.stringify(reader));
    
            ReaderService.updateReader(reader,this.state.id)
                .then( res =>{
                    this.props.history.push('/reader');
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
                                <h3 className="text-center">Update Reader</h3>
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
                                                 value={this.state.jmbg} onChange={this.changeJMBGHandler}/>                                
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
                                            
                                             <button className="btn btn-success" onClick={this.updateReader}>Save</button>

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

export default UpdateReaderComp;