const db = require('../../database/models');

module.exports = {
    getUsers: async (req, res) => {
        try {
            let statusCode = 200;
            const users = await db.User.findAll();

            statusCode = users.length > 0 ? statusCode : 204;

            const response = {
                data: users,
                meta: {
                    status: statusCode,
                    path: req.baseUrl,
                    quantity: users.length,
                    query: req.query
                }
            }

            res.status(statusCode).json(response);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Server error', code: '500'});
        }
    },
    
    getUserById: async (req, res) => {
        try {
            const user = await db.User.findByPk(req.params.id);
            res.json(user);
        } catch (error) {
            console.error(error);
            res.json({error: 'Server error', code: '504'});
        }
    }
}