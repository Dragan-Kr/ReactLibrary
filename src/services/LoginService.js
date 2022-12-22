import axios from 'axios';

const login_API_BASE_URL= "http://localhost:8080/login";

class LoginService{

    getUserByID(userid){
        return axios.get(login_API_BASE_URL + '/'+ userid);
    }


}
export default new LoginService