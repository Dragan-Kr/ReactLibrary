import axios from 'axios'


const Payment_API_Base_URL ="http://localhost:8080/payment"


class PaymentService{
    getPayments(){
        return axios.get(Payment_API_Base_URL);
    }

    createPayment(payment){
        return axios.post(Payment_API_Base_URL,payment);
    }

    updatePayment(payment,paymentId){
        return axios.put(Payment_API_Base_URL + '/' +paymentId,payment);
    }
    getPaymentById(paymentId){
        return axios.get(Payment_API_Base_URL +'/' +paymentId)
    }

    deletePayment(paymentID){
        return axios.delete(Payment_API_Base_URL + '/' + paymentID);
    }
}

export default new PaymentService()