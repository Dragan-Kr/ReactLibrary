import axios from 'axios'

const Author_API_Base_URL = "http://localhost:8080/author";

class AuthorService{
    getAuthors(){
        return axios.get(Author_API_Base_URL);
    }

    createAuthor(author){
        return axios.post(Author_API_Base_URL,author);
    }

    getAuthorByID(authorId){
        return axios.get(Author_API_Base_URL + '/' + authorId);
    }


    updateAuthor(author,authorId){
        return axios.put(Author_API_Base_URL + '/' + authorId,author);
    }

    deleteAuthor(authorId){
        return axios.delete(Author_API_Base_URL + '/' + authorId);
    }
}

export default new AuthorService()