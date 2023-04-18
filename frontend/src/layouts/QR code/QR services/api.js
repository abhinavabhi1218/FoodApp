import axios from 'axios';

// const usersUrl = 'http://localhost:3003/users';
const usersUrl = 'http://localhost:8081';





export const addQrDet = async (qrData) => {
    console.log(qrData," QR Data from api.js")
    return  axios.post(`${usersUrl}/qr`, qrData);



  
}