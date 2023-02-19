//This Router is to handle all operations related to Products in Northwind external service
const express = require('express');
const router = express.Router();
const axios_instance = require('../middleware/axiosinstance');

const { getSupplierDetails, getProducts, getFilterByPropery } = require('../controller/northwindProducts');
/* //Ex:- Get Products from remote Northwind service... (worked)
router.route('/').get(async(req, res) => {
    try {
        const results = await axios_instance.get('/Products');
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(results.data.value));
    } catch (error) {
        res.status(400);
    }
}) */
//https://mynodeapp.cfapps.us10-001.hana.ondemand.com/api/v1/Northwind_srv
router.route('/').get(getProducts);
//https://mynodeapp.cfapps.us10-001.hana.ondemand.com/api/v1/Northwind_srv/filterby/ProductID=2
//https://mynodeapp.cfapps.us10-001.hana.ondemand.com/api/v1/Northwind_srv/filterby/CategoryID=2
router.route('/filterby/:id').get(getFilterByPropery);
//https://mynodeapp.cfapps.us10-001.hana.ondemand.com/api/v1/Northwind_srv/withSupplier similar to
//https://services.odata.org/v4/northwind/northwind.svc/Products?$expand=Supplier

router.route('/withSupplier').get(getSupplierDetails);


//The below export of this module is required to reuse in start2.js
module.exports = router;