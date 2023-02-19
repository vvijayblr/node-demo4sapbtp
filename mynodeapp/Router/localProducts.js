//This Router is to handle all operations related to Products in local Products.json file
const express = require('express');
const router = express.Router();
const local_products_data = require('../data/Products.json');

//Ex:- Get Local Products (worked)
router.route('/').get((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(local_products_data));
})

//Ex:- Post New Products (worked)
router.route('/').post((req, res) => {
    const payload = req.body;
    local_products_data.Products.push(payload);
    res.setHeader('Content-Type', 'application/json');
    res.status(201).send(JSON.stringify(local_products_data));
})
//The below export of this module is required to reuse in start2.js
module.exports = router;