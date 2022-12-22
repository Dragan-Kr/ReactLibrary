import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import MemCardService from '../services/MemCardService';
class CreateMemCardComp extends Component {
    constructor(props){
        super(props)
        this.state ={
            dateofissue:'',
            duration:'',
            employeeid:'',
            readerid:'',
        }
       this.changeDateOfIssueHandler = this.changeDateOfIssueHandler.bind(this);
       this.changeDurationHandler = this.changeDurationHandler.bind(this);
            
        }
       
    

    changeDateOfIssueHandler=(event)=>{
        this.setState({dateofissue:event.target.value})
    }

    changeDurationHandler=(event)=>{
        this.setState({duration:event.target.value});
    }

    saveMemCard =(e)=>{
        e.preventDefault();
        let memCard = {dateofissue:this.state.dateofissue, duration:this.state.duration,  employeeid:this.state.employeeid,readerid:this.state.readerid };
        console.log("memCard=>" +JSON.stringify(memCard));
       

        MemCardService.createMemCard(memCard).then(res => {
            this.props.history.push('/memCard');
        }).catch((error)=>{
            console.log(error.message);
        });
    
    }
    cancel(){
        this.props.history.push('/memCard');
    }

    render(){
        return (
            <div>
                  <div className="container">
                       <div className="row">
                            <div className="card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Add Membership Card</h3>
                                    <div className="card-body">
                                         <form>

                                         <div className="form-group">
                                                 <label>Date of issue</label>
                                                 <input placeholder="DateOfIssue" type='date' name="dateofissue" className="form-control"
                                                 value1={this.state.dateofissue} onChange={this.changeDateOfIssueHandler}/>                                
                                             </div>

                                             <div className="form-group">
                                                 <label>Duration</label>
                                                 <input placeholder="Duration" name="duration" className="form-control"
                                                 value2={this.state.duration} onChange={this.changeDurationHandler}/>                                
                                             </div>

                                             
                                             <label>Employee</label>
                                             <div>
                                                <Select options={this.state.SelectEmployees} value3={this.state.employeeid}  onChange={this.handleEmployeeChange.bind(this)} />
                                            </div>

                                            <label>Reader</label>
                                            <div>
                                                <Select options={this.state.SelectReaders} value4={this.state.readerid}  onChange={this.handleReaderChange.bind(this)} />
                                            </div>

                                             
                                                                                         
                                             <button className="btn btn-success" onClick={this.saveMemCard}>Save</button>

                                            <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>

                                         </form>
                                    </div>

                            </div>
                       </div>
                  </div>
                
                
            </div>
        );
    }

    async getListOfEmployees(){
        const res = await axios.get('http://localhost:8080/employee')
        const data =res.data

        const employees = data.map(e=>({
            "value":e.id,
            "label":e.name +" "+e.surname +" " +e.email
        }))
        this.setState({SelectEmployees:employees})
    }
    handleEmployeeChange(e){
        this.setState({employeeid:e.value, name:e.label})
    }
  


    async getListOfReaders(){
        const res = await axios.get('http://localhost:8080/reader')
        const data =res.data

        const readers = data.map(r=>({
            "value":r.id,
            "label":r.name +" " +r.surname +" " +r.contact
        }))
        this.setState({SelectReaders:readers})
    }
    handleReaderChange(e){
        this.setState({readerid:e.value, name:e.label})
    }

     componentDidMount(){
         this.getListOfEmployees();
         this.getListOfReaders();
     }
}

export default CreateMemCardComp;