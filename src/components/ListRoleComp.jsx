import React, { Component } from 'react';
import RoleService from '../services/RoleService';


class ListRoleComp extends Component {
    constructor(props){
        super(props)
        this.state = {
            roles:[]
        }

        this.addRole = this.addRole.bind(this);
        this.editRole = this.editRole.bind(this);        
         this.deleteRole = this.deleteRole.bind(this);
    }


    componentDidMount(){
        RoleService.getRoles().then((res)=>{
            this.setState({roles:res.data});
        });
        }

        addRole(){
            this.props.history.push("/add-Role");
        }

        editRole(id){
            this.props.history.push(`/update-role/${id}`);
        }


        deleteRole(id){
            RoleService.deleteRole(id).then(res =>{
                this.setState({roles:this.state.roles.filter(role => role.id !== id)});
            })
    
        }
       
    render() {
        return (
            <div>
              <h2 className="text-center">Role List</h2>
                 <div className="row">
                 <button className="btn btn-primary" onClick={this.addRole}>Add Role</button>
                 </div>

                 <div className="row">
                 <table className="table table-striped table-bordered">
                     <thead>
                         <tr>
                            <th>Name</th>                         
                            <th>Actions</th>
                                    
                         </tr>

                     </thead>
                     <tbody>
                         {
                             this.state.roles.map(
                                role=>
                                 <tr key={role.id}>
                                     <td>{role.name}</td>
                                     
                                     <td>
                                         <button onClick={ () => this.editRole(role.id)} className="btn btn-info">Update</button>
                                         <button style={{marginLeft:"10px"}} onClick={ () => this.deleteRole(role.id)} className="btn btn-danger">Delete</button>

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

export default ListRoleComp;