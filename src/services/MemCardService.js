import axios from 'axios'

const MemCard_API_Base_UR="http://localhost:8080/membershipCard";

class MemCardService{

    getMemCards(){
        return axios.get(MemCard_API_Base_UR);
    }

    createMemCard(memCard){
        return axios.post(MemCard_API_Base_UR,memCard);
    }

    getMemCardById(memCardId){
        return axios.get(MemCard_API_Base_UR +'/' +memCardId);
    }

    updateMemCard(memCard,memCardId){
        return axios.put(MemCard_API_Base_UR + '/' +memCardId,memCard);
    }

    deleteMemCard(memCardId){
        return axios.get(MemCard_API_Base_UR +'/' +memCardId);
    }
}

export default new MemCardService()