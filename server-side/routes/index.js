const express = require('express');
const AuthController = require('../controllers/AuthController.js');
const router = express.Router();
const { errorHandler } = require('../middlewares/errorHandler.js');
const { authentication } = require('../middlewares/authentication.js');
const FavoriteController = require('../controllers/FavoriteController.js');
const UserController = require('../controllers/UserController.js');
const DalleController = require('../controllers/DalleController.js');
const uploader = require("../middlewares/uploader.js")


router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

router.use(authentication);

router.post('/dalle', DalleController.createImage);

router.post('/my-favorites', uploader.single("imgUrl"), FavoriteController.addFavorite);
router.get('/my-favorites/:id', FavoriteController.getAllFavoritesByUserId);
router.delete('/my-favorites/:id', FavoriteController.deleteFavorite);

router.get('/my-profile/:id', UserController.getUserById);
router.put('/my-profile/:id', UserController.updateUser);

router.use(errorHandler);

module.exports = router