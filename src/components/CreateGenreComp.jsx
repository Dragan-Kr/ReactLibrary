import React, { Component } from 'react';
import GenreService from '../services/GenreService';

class CreateGenreComp extends Component {

    constructor(props){
        super(props)
        this.state ={
         name: ''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
    }


    changeNameHandler=(event)=>{
        this.setState({name:event.target.value});
    }

    saveGenre =(e)=>{
        e.preventDefault();
        let genre = {name:this.state.name};
        console.log("genre=>" +JSON.stringify(genre));

        GenreService.createGenre(genre).then(res => {
            this.props.history.push('/genre');
        }).catch((error)=>{
            console.log(error.message);
        });
    
    }

    cancel(){
        this.props.history.push('/genre');
    }




    render() {
        return (
            <div>
                 <div className="container">
                       <div className="row">
                            <div className="card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Add Genre</h3>
                                    <div className="card-body">
                                         <form>

                                         <div className="form-group">
                                                 <label>Name</label>
                                                 <input placeholder="Name" name="name" className="form-control"
                                                 value={this.state.name} onChange={this.changeNameHandler}/>                                
                                             </div>

                                             <button className="btn btn-success" onClick={this.saveGenre}>Save</button>

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

export default CreateGenreComp;