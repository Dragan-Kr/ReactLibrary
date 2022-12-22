import axios from 'axios'


const Genre_API_Base_URL ="http://localhost:8080/genre";

class GenreService{
    getGenres(){
        return axios.get(Genre_API_Base_URL);
    }

    createGenre(genre){
        return axios.post(Genre_API_Base_URL,genre);
    }


    getGenreByID(genreId){
        return axios.get(Genre_API_Base_URL + '/' + genreId);
    }

    updateGenre(genre,genreId){
        return axios.put(Genre_API_Base_URL + '/' + genreId,genre);
    }

    deleteGenre(genreID){
        return axios.delete(Genre_API_Base_URL + '/' + genreID);
    }
}

export default new GenreService()