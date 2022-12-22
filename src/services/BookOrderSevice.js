import axios from 'axios'

const BookOrder_API_Base_URL = "http://localhost:8080/bookOrder";

class BookOrderService{
    getBookOrders(){
        return axios.get(BookOrder_API_Base_URL);
    }

    createBookOrder(bookOrder){
        return axios.post(BookOrder_API_Base_URL,bookOrder);
    }

    getBookOrderByID(bookOrderID){
        return axios.get(BookOrder_API_Base_URL +'/' + bookOrderID);
    }

    updateBookOrder(bookOrder,bookOrderID){
        return axios.put(BookOrder_API_Base_URL +'/' +bookOrderID,bookOrder);
    }

    deleteBookOrder(bookOrderID){
        return axios.delete(BookOrder_API_Base_URL +'/' + bookOrderID);
    }

}
export default new BookOrderService();