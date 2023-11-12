const db = require('../../database/models');

module.exports = {
    getProducts: async (req, res) => {
        try {
            let statusCode = 200;
            const products = await db.Product.findAll();

            statusCode = products.length > 0 ? statusCode : 204;

            const response = {
                data: products,
                meta: {
                    status: statusCode,
                    path: req.baseUrl,
                    quantity: products.length,
                    query: req.query
                }
            }

            res.status(statusCode).json(response);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Server error', code: '500'});
        }
    },
    
    getProductById: async (req, res) => {
        try {
            const product = await db.Product.findByPk(req.params.id);
            res.json(product);
        } catch (error) {
            console.error(error);
            res.json({error: 'Server error', code: '504'});
        }
    }
}