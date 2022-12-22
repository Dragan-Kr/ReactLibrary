import axios from "axios";

const Role_Base_API_URL ="http://localhost:808 0/role";

class RoleService   {
   getRoles(){
       return axios.get(Role_Base_API_URL)
   }

   getRoleById(roleId){
       return axios.get(Role_Base_API_URL + '/' + roleId);
   }

   createRole(role){
       return axios.post(Role_Base_API_URL,role);
   }

   updateRole(role,roleId){
       return axios.put(Role_Base_API_URL + '/'+roleId,role);
   }

   deleteRole(roleId){
       return axios.delete(Role_Base_API_URL +'/' + roleId)
   }



}

export default RoleService;