const axiosinstance = require('../middleware/axiosinstance');
exports.getSupplierDetails = async (req, res) => {

    try {
        const results = await axiosinstance.get('/Products',{
            params : {
                '$expand': 'Supplier'
            }
        });
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(results.data.value));
    } catch (error) {
        res.status(400);
    }
}

exports.getProducts = async (req, res) => {

    try {
        const results = await axiosinstance.get('/Products');
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(results.data.value));
    } catch (error) {
        res.status(400);
    }
}

exports.getFilterByPropery =  async (req, res) => {

    const ID = req.params.id;
    const field = ID.match(/\S+(?==)/g)[0]
    const value = ID.split('=').pop();
    try {
        const results = await axiosinstance.get('/Products', {
            params : {
                $filter: `${field} eq ${value}`
            }
        });
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(results.data.value));
    } catch (error) {
        res.status(400);
    }
}