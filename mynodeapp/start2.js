const express = require('express');
const app = express();
const Product_local = require('./data/Products.json');
const axios = require('axios');

const alllocalproducts = require('./Router/localProducts');
const nwproducts = require('./Router/nwProducts');

const { json } = require('express');
app.use(json());
app.use(express.urlencoded({ extended: false }));
app.use('/AllProducts', alllocalproducts);
app.use('/api/v1/Northwind_srv', nwproducts);
//GET ROOT
app.get('/', (req, res) => {
    //Ex - Sending response in text format
    res.setHeader('Content-Type', 'text/html');
    res.send('<h4 style="color:GREEN";> Hello from Express...</h4>');
});
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`mynodeapp listening to PORT ${port}`);
});        