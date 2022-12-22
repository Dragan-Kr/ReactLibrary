import axios from 'axios'

const Rent_API_Base_URL = "http://localhost:8080/rent";


class RentService{
    getRents(){
        return axios.get(Rent_API_Base_URL);
    }

    createRent(rent){
        return axios.post(Rent_API_Base_URL,rent);
    }

    updateRent(rent,rentId){
        return axios.put(Rent_API_Base_URL+'/' +rentId,rent);
    }
    getRentById(rentId){
        return axios.get(Rent_API_Base_URL +'/' +rentId);
    }

    deleteRent(id){
        return axios.delete(Rent_API_Base_URL+ '/' +id);
    }
}

export default new RentService()