const db = require('../database/models');
const path = require('path')

const userControllerAPI = {

    getUsers: async (req, res) => {
        try {
            let statusCode = 200;
            const users = await db.User.findAll();

            statusCode = users.length > 0 ? statusCode : 204;

            const response = {
                count: users.length,
                users: users.map(user => ({
                    id: user.id_user,
                    name: user.name_user,
                    email: user.email_user,
                    detail: `http://localhost:${(process.env.PORT || 3000)}/api/users/${user.id_user}/detail`
                  })),
                
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

    profileImage: async (req, res) => {
        try {
          const userId = req.params.id;
          const user = await db.User.findByPk(userId);
    
          const filename = user.image_user;
          const userProfileImage = path.join(__dirname, '../../public/images/users', filename);
    
          res.sendFile(userProfileImage);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Server error', code: '500' });
        }
      },
    
      getUserById: async (req, res) => {
        try {
          const userId = req.params.id;
          const user = await db.User.findByPk(userId);
    
          const response = {
            id: user.id_user,
            name: user.name_user,
            last_name: user.lastname_user,
            email: user.email_user,
            birthday: user.bdate_user,
            image: `/api/users/profile-image/${userId}`,
          };
    
          res.json(response);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Server error', code: '500' });
        }
      },
};

module.exports = userControllerAPI;