const axios = require('axios');
const axiosInstance = axios.create({
    baseURL: 'https://services.odata.org/v4/northwind/northwind.svc'
});
module.exports = axiosInstance