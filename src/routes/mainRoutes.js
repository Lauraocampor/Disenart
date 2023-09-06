const express = require ('express');
const router = express.Router();

const mainController = require ('../controllers/mainControllers');

router.get('/', mainController.home);

// @GET CERRAR SESIÓN
router.get('/logout', mainController.logout);

module.exports = router