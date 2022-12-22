import React, { Component } from 'react';
import PublisherService from '../services/PublisherService';



class UpdatePublisherComp extends Component {
    constructor(props){
        super(props)
        this.state ={
            id:this.props.match.params.id,
            name: '',
            address: '',
            contact: ''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeAddressHandler = this.changeAddressHandler.bind(this);
        this.changeContactHandler = this.changeContactHandler.bind(this);
       
    }


    
    componentDidMount(){
        PublisherService.getPublisherById(this.state.id).then((res) =>{
            let publisher = res.data;
            this.setState({name: publisher.name,
                address: publisher.address,
                contact:publisher.contact
            });

        });
    }



    changeNameHandler=(event)=>{
        this.setState({name:event.target.value});
    }

    changeAddressHandler=(event)=>{
        this.setState({address:event.target.value});
    }

    changeContactHandler=(event)=>{
        this.setState({contact:event.target.value});
    }

    updatePublisher =(e)=>{
        e.preventDefault();
        let publisher = {name:this.state.name,address:this.state.address, contact:this.state.contact}
        console.log("publisher=>" +JSON.stringify(publisher));

        PublisherService.updatePublisher(publisher,this.state.id).then( res =>{
            this.props.history.push('/publisher');
 
        });    
    
    }

    cancel(){
        this.props.history.push('/publisher');
    }




    render() {
        return (
            <div>
                 <div className="container">
                       <div className="row">
                            <div className="card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update Publisher</h3>
                                    <div className="card-body">
                                         <form>

                                         <div className="form-group">
                                                 <label>Name</label>
                                                 <input placeholder="Name" name="name" className="form-control"
                                                 value1={this.state.name} onChange={this.changeNameHandler}/>                                
                                             </div>

                                             <div className="form-group">
                                                 <label>Address</label>
                                                 <input placeholder="Address" name="address" className="form-control"
                                                 value2={this.state.address} onChange={this.changeAddressHandler}/>                                
                                             </div>


                                             <div className="form-group">
                                                 <label>Contact</label>
                                                 <input placeholder="Contact" name="contact" className="form-control"
                                                 value3={this.state.contact} onChange={this.changeContactHandler}/> 
                                             </div>
                                            
                                             <button className="btn btn-success" onClick={this.updatePublisher}>Save</button>

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

export default UpdatePublisherComp;