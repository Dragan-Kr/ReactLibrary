import React, { Component } from 'react';
import AuthorService from '../services/AuthorService';

class UpdateAuthorComp extends Component {

    constructor(props){
        super(props)
        this.state ={
         id: this.props.match.params.id,//uzimam id iz rute
         name: '',
         surname:''  
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeSurnameHandler = this.changeSurnameHandler.bind(this);
        this.updateAuthor = this.updateAuthor.bind(this);
    }


    componentDidMount(){
        AuthorService.getAuthorByID(this.state.id).then((res) =>{
            let author = res.data;
            this.setState({name: author.name,
                surname: author.surname
            });

        });
    }

    changeNameHandler=(event)=>{
        this.setState({name:event.target.value});
    }

    changeSurnameHandler=(event)=>{
        this.setState({surname:event.target.value});
    }

    updateAuthor = (e)=>{
        e.preventDefault();
        let author = {name: this.state.name,surname: this.state.surname};
        console.log("author=>" +JSON.stringify(author));
        console.log('id => ' + JSON.stringify(this.state.id));

       AuthorService.updateAuthor(author,this.state.id).then( res =>{
           this.props.history.push('/author');

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
                                <h3 className="text-center">Update Author</h3>
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
                                                 value1={this.state.surname} onChange={this.changeSurnameHandler}/>                                
                                             </div>


                                             
                                            
                                             <button className="btn btn-success" onClick={this.updateAuthor}>Save</button>

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


export default UpdateAuthorComp;