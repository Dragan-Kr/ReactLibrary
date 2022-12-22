import axios from 'axios'

const Publisher_API_Base_URL = "http://localhost:8080/publisher";

class PublisherService{

    getPublishers(){
        return axios.get(Publisher_API_Base_URL);
    }

    createPublisher(publisher){
        return axios.post(Publisher_API_Base_URL,publisher);
    }

    getPublisherById(publisherID){
        return axios.get(Publisher_API_Base_URL+'/' +publisherID);
    }

    updatePublisher(publisher,publisherID){
        return axios.put(Publisher_API_Base_URL +'/'+publisherID,publisher);
    }
    deletePublisher(publisherID){
        return axios.delete(Publisher_API_Base_URL +'/' +publisherID);
    }
}

export default new PublisherService()