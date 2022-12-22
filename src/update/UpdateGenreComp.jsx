import React, { Component } from 'react';
import GenreService from '../services/GenreService';

class UpdateGenreComp extends Component {
    
    constructor(props){
        super(props)
        this.state ={
        id: this.props.match.params.id,
         name: ''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.updateGenre = this.updateGenre.bind(this);
    }


    componentDidMount(){
        GenreService.getGenreByID(this.state.id).then((res) =>{
            let genre = res.data;
            this.setState({name: genre.name});

        });
    }






    changeNameHandler=(event)=>{
        this.setState({name:event.target.value});
    }

    updateGenre =(e)=>{
        e.preventDefault();
        let genre = {name:this.state.name};
        console.log("genre=>" +JSON.stringify(genre));
        console.log('id => ' + JSON.stringify(this.state.id));

        GenreService.updateGenre(genre,this.state.id).then(res =>{
            this.props.history.push('/genre');
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
                                <h3 className="text-center">Update Genre</h3>
                                    <div className="card-body">
                                         <form>

                                         <div className="form-group">
                                                 <label>Name</label>
                                                 <input placeholder="Name" name="name" className="form-control"
                                                 value={this.state.name} onChange={this.changeNameHandler}/>                                
                                             </div>

                                             <button className="btn btn-success" onClick={this.updateGenre}>Save</button>

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


export default UpdateGenreComp;