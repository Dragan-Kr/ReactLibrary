import axios from 'axios'

const Reader_API_Base_URL="http://localhost:8080/reader";

class ReaderService{
    getReaders(){
        return axios.get(Reader_API_Base_URL);
    }

    createReader(reader){
        return axios.post(Reader_API_Base_URL,reader);
    }

    getReaderByID(readerId){
        return axios.get(Reader_API_Base_URL +'/' +readerId);
    }

    updateReader(reader,readerId){
        return axios.put(Reader_API_Base_URL +'/'+readerId, reader);
    }

    deleteReader(readerId){
        return axios.delete(Reader_API_Base_URL + '/' +readerId);
    }

}

export default new ReaderService()