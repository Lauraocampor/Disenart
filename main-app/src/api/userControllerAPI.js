const db = require('../database/models');
const path = require('path')

const userControllerAPI = {
  
    getUsers: async (req, res) => {
      try {
        let statusCode = 200;
  
        // parametros para la paginacion
        const page = req.query.page || 1; // pagina 1 es la predeterminada
        const itemsPerPage = 10;
        const offset = (page - 1) * itemsPerPage;
        const limit = itemsPerPage;
  
        const users = await db.User.findAll({
          limit,
          offset,
        });
  
        const totalCount = await db.User.count();
        const totalPages = Math.ceil(totalCount / itemsPerPage);
  
        const nextPage = page < totalPages ? `http://localhost:${(process.env.PORT || 3000)}/api/users/?page=${page + 1}` : null;
        const prevPage = page > 1 ? `http://localhost:${(process.env.PORT || 3000)}/api/users/?page=${page - 1}` : null;
  
        statusCode = users.length > 0 ? statusCode : 204;
  
        const response = {
          count: users.length,
          users: users.map(user => ({
            id: user.id_user,
            name: user.name_user,
            email: user.email_user,
            detail: `http://localhost:${(process.env.PORT || 3000)}/api/users/${user.id_user}/detail`,
          })),
          meta: {
            status: statusCode,
            path: req.baseUrl,
            quantity: users.length,
            query: req.query,
            pagination: {
              total: totalCount,
              totalPages,
              currentPage: page,
              nextPage,
              prevPage,
            },
          },
        };
  
        res.status(statusCode).json(response);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error', code: '500' });
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
            image: '/api/users/profile-image/${userId}',
          };
    
          res.json(response);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Server error', code: '500' });
        }
      },
};

module.exports = userControllerAPI;