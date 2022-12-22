import React, { Component } from 'react';
import AuthorService from '../services/AuthorService';


class CreateAuthorComp extends Component {
    constructor(props){
        super(props)
        this.state ={
         name: '',
         surname:''  
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeSurnameHandler = this.changeSurnameHandler.bind(this);
       this.saveAuthor = this.saveAuthor.bind(this);
    }

    changeNameHandler=(event)=>{
        this.setState({name:event.target.value});
    }

    changeSurnameHandler=(event)=>{
        this.setState({surname:event.target.value});
    }

    saveAuthor =(e)=>{
        e.preventDefault();
        let author = {name:this.state.name, surname:this.state.surname};
        console.log("author=>" +JSON.stringify(author));

        AuthorService.createAuthor(author).then(res => {
            this.props.history.push('/author');
        }).catch((error)=>{
            console.log(error.message);
        });
    
    }
    cancel(){
        this.props.history.push('/author');
    }


    render() {
        return (
            <div>
                <div className="container">
                       <div className="row">
                            <div className="card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Add Author</h3>
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


                                             
                                            
                                             <button className="btn btn-success" onClick={this.saveAuthor}>Save</button>

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

export default CreateAuthorComp;