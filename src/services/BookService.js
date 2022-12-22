import axios from 'axios'

const Book_API_Base_URL = "http://localhost:8080/book";

class BookService{
    getBooks(){
        return axios.get(Book_API_Base_URL);
    }

    createBook(book){
        console.log("Izabran id autora je" + book.authorid);
        return axios.post(Book_API_Base_URL,book);
    }
/*
    createAuthor(book){
        console.log("Book izabran id autora je" + book.authorid);
        return axios.post(Book_API_Base_URL,book);
    }
    */


    updateBook(book,bookId){
        return axios.put(Book_API_Base_URL + '/' + bookId,book);
    }

    getBookByID(bookId){
        return axios.get(Book_API_Base_URL + '/' + bookId);
    }

    deleteBook(bookID){
        return axios.delete(Book_API_Base_URL + '/' + bookID);
    }

}

export default new BookService()
