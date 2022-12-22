import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
class ListEmployeeComp extends Component {
    constructor(props){
        super(props)
        this.state = {
            employees:[],

            search: "",
            isOldestFirst: true
           
        }
      this.addEmployee = this.addEmployee.bind(this);
      this.editEmployee = this.editEmployee.bind(this);
      this.deleteEmployee = this.deleteEmployee.bind(this);   
      this.toggleSortID=this.toggleSortID.bind(this);
      this.toggleListReverse=this.toggleListReverse.bind(this); 
    }

    componentDidMount(){
        
        EmployeeService.getEmployees().then((res)=>{
            this.setState({employees:res.data});
        });
        }
    
        addEmployee(){
            this.props.history.push("/add-Employee");
        }


        editEmployee(id){
            this.props.history.push(`/update-employee/${id}`);
        }


        deleteEmployee(id){
            EmployeeService.deleteEmployee(id).then(res =>{
                this.setState({employees:this.state.employees.filter(employee => employee.id !== id)});
            })
    
        }


        updateSearch(event){
            this.setState({search: event.target.value.substr(0,20)})
        }
        toggleSortID(){
            this.sortByID();
        }

        sortByID(){
            const {employees} = this.state
            let newEmployees = employees.reverse();
            if(this.state.isOldestFirst){
                newEmployees  = employees.sort((a,b)=>a.id > b.id ? 1:-1)

            }else{
                newEmployees  = employees.sort((a,b)=>a.id < b.id ? 1:-1)
            }
            this.setState({
                isOldestFirst: !this.state.isOldestFirst,
                employees: newEmployees
            })
        }


        toggleListReverse(event){
            const {employees} = this.state
            let newEmployees = employees.reverse();
            this.setState({
                employees: newEmployees
            })
        }


        
        componentDidMountSort(){

            const employees=ListEmployeeComp
            this.setState({
                isOldestFirst:true,
                employees: employees
            }) 
        }



    render() {
        let filteredEmployees =this.state.employees.filter(
            (employees) =>{
                return employees.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !==-1
            }
        )


        return (
            <div>
                 <h2 className="text-center">Employee List</h2>
                 <div className="row">
                 <input style={{width:150}} type="text" placeholder="Search name" value={this.state.search} onChange={this.updateSearch.bind(this)}/>
                 <button className="sort-by" onClick={ this.toggleSortID}>Sort</button>
                 {/* <button className="btn btn-primary" onClick={this.addEmployee}>Add Employee</button> */}
                 </div>

                 <div className="row">
                 <table className="table table-striped table-bordered">
                     <thead>
                         <tr>
                             <th>ID</th>
                             <th>Name</th>
                             <th>Surname</th>
                             <th>Address</th>
                             <th>Contact</th>
                             <th>JMBG</th>
                             <th>UserName</th>
                             <th>Password</th>
                             <th>Actions</th>
                             
                             
                         </tr>

                     </thead>
                     <tbody>
                         {
                             filteredEmployees.map(
                                employee=>
                                 <tr key={employee.id}>
                                     <td>{employee.id}</td>
                                     <td>{employee.name}</td>
                                     <td>{employee.surname}</td>
                                     <td>{employee.address}</td>
                                     <td>{employee.contact}</td>
                                     <td>{employee.jbmg}</td>
                                     <td>{employee.username}</td>
                                     <td>{employee.password}</td>
                                     <td>
                                     <button onClick={ () => this.editEmployee(employee.id)} className="btn btn-info">Update</button>
                                     <button style={{marginLeft:"10px"}} onClick={ () => this.deleteEmployee(employee.id)} className="btn btn-danger">Delete</button>

                                     </td>
                                     
                                 </tr>
                             )
                         }
                     </tbody>
                 </table>
                 </div>
            </div>
        );
    }
}

export default ListEmployeeComp;