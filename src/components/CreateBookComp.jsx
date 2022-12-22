import React, { Component } from 'react';
import BookService from '../services/BookService';
import axios from 'axios';
import Select from 'react-select';

class CreateBookComp extends Component {
    constructor(props){
        super(props)
        this.state ={
         id:'',
         name:'',
         authorid:'',
         genreid:''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
      //  this.changeAuthorNameHandler = this.changeAuthorNameHandler.bind(this);
        //this.changeGenreNameHandler = this.changeGenreNameHandler.bind(this);
    }

    changeNameHandler=(event)=>{
        this.setState({name:event.target.value});
    }
/*
    changeAuthorNameHandler=(event)=>{
        this.setState({author:event.target.value});
    }

    changeGenreNameHandler=(event)=>{
        this.setState({genre:event.target.value});
    }
    */

   

    saveBook =(e)=>{
        e.preventDefault();
        let book = {name:this.state.name,authorid:this.state.authorid,genreid:this.state.genreid};
        console.log("book=>" +JSON.stringify(book));
        console.log("authorID je" + this.state.authorid);
        console.log("genreID je" + this.state.genreid);

        BookService.createBook(book).then(res => {
            this.props.history.push('/book');
        }).catch((error)=>{
            console.log(error.message);
        });
    
    }
    cancel(){
        this.props.history.push('/book');
    }


    render() {
        return (
            <div>
                <div className="container">
                       <div className="row">
                            <div className="card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Add Book</h3>
                                    <div className="card-body">
                                         <form>

                                         <div className="form-group">
                                                 <label>Name</label>
                                                 <input placeholder="Name" name="name" className="form-control"
                                                 value1={this.state.name} onChange={this.changeNameHandler}/>                                
                                             </div>

                                             <div>
                                                 <label>Author</label>
                                                <Select options={this.state.SelectAuthors} value2={this.state.authorid}  onChange={this.handleAuthorChange.bind(this)} />
                                            </div>

                                            <div>
                                                <label>Genre</label>
                                                <Select options={this.state.SelectGenres} value3={this.state.genreid}  onChange={this.handleGenreChange.bind(this)} />
                                            </div>

                                             
                                                                                         
                                             <button className="btn btn-success" onClick={this.saveBook}>Save</button>

                                            <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>

                                         </form>
                                    </div>

                            </div>
                       </div>
                  </div>
                
            </div>
        );
    }


    async getListOfAuthors(){
        const res = await axios.get('http://localhost:8080/author')
        const data = res.data
    
        const authors = data.map(d => ({
          "value" : d.id,
          "label" : d.name + " " + d.surname
        }))
        this.setState({SelectAuthors: authors})
      }

      componentDidMount(){
          this.getListOfAuthors()
          this.getListOfGenres()
      }

      handleAuthorChange(e){
          this.setState({authorid:e.value,name:e.label})
      }


      async getListOfGenres(){
          const res = await axios.get('http://localhost:8080/genre')
          const data =res.data

          const genres = data.map(g=>({
              "value":g.id,
              "label":g.name
          }))
          this.setState({SelectGenres:genres})
      }
      handleGenreChange(e){
          this.setState({genreid:e.value, name:e.label})
      }

}

export default CreateBookComp;