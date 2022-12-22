import axios from 'axios'

const Employee_API_Base_URL ="http://localhost:8080/employee";

class EmployeeService{

    getEmployees(){
        return axios.get(Employee_API_Base_URL);
    }

    createEmployee(employee){
        return axios.post(Employee_API_Base_URL,employee);
    }

    getLogIn(username,password){
        return axios.get(Employee_API_Base_URL + '/' + username + '/' + password);
    }

    getRole(username){
        return axios.get(Employee_API_Base_URL + '/' + username);
    }

    getEmployeeById(employeeID){
       return axios.get(Employee_API_Base_URL + '/' + employeeID);
    }

    deleteEmployee(empId){
        return axios.delete(Employee_API_Base_URL + '/' +empId);
    }

}

export default new EmployeeService();
