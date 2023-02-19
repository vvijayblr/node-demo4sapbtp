const express = require('express');
const app = express();
const Product_local = require('./data/Products.json');
const axios = require('axios');

const { json } = require('express');
app.use(json());
app.use(express.urlencoded({ extended: false }));
//GET ROOT
app.get('/', (req, res) => {
    //Ex - Sending response in text format
    res.setHeader('Content-Type', 'text/html');
    res.send('<h4 style="color:Red";> Hello from Express...</h4>');
    //Ex- Sending response in JSON format
    /*     res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            'Coursename': 'CAPM learning'
        })); */

    //Ex- Posting records (didn't work)
    /*     if(res.method === 'POST') {
            let DATA = [];
            res.on('FetchData',(chunk) => {
                DATA.push(chunk);
            }).on('AtEnd', () => {
                const bodyString = Buffer.concat(DATA).toString();
                res.end(JSON.stringify(JSON.parse(bodyString)));
            })
        } */
    //Ex:- Get Local Products (worked)
    app.get('/AllProducts', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(Product_local));
    })
    //Ex:- Post New Products (worked)
    /*
    To prevent 'null' being inserted because req.body is not passed in, use middleware as below
    const {json} = require('express');
    app.use(json());
    app.use(express.urlencoded({extended: false}));
    */
    app.post('/AllProducts', (req, res) => {
        const payload = req.body;
        Product_local.Products.push(payload);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(Product_local));
    })

    //Ex:- Access external Northwind service
    /*
    Install axios node module, to extract info from Northwind

    */
    const axios_instance = axios.create({
        baseURL: 'https://services.odata.org/v4/northwind/northwind.svc'
    });
    app.get('/api/v1/Northwind_srv', async (req, res) => {
        //Method#1: didn' work
        /*          axios.get('https://services.odata.org/v4/northwind/northwind.svc/Products?$format=json')
                .then((results) => {
                    alert(results);
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200).send(JSON.stringify(results.data.value));            
                }); */
        //Method#2: use of baseURL approach - Worked!!!
        /*      axios_instance.get('/Products').then((results) => {
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200).send(JSON.stringify(results.data.value));            
                }); */
        //Method#3: using await async - Worked!!!
        try {
            const results = await axios_instance.get('Categories');
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(results.data.value));
        } catch (error) {
            res.status(400);
        }


    })
    //Ex: Filter Query - $FILTER - Worked!!!
    //https://services.odata.org/v4/northwind/northwind.svc/Products?$filter=SupplierID%20eq%202&$format=json

    app.get('/api/v1/Northwind_srv/Products/:id', async(req, res) => {
        const ID = req.params.id;
        const field = ID.match(/\S+(?==)/g)[0]
        const value = ID.split('=').pop();
        try {
            const results = await axios_instance.get('Products', {
                params : {
                    $filter: `${field} eq ${value}`
                }
            });
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(results.data.value));
        } catch (error) {
            res.status(400);
        }
    })
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`mynodeapp listening to PORT ${port}`);
});
