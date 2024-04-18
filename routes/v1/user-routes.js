const express =require('express');
const UserController = require('../../controllers/user/user-controller');

const router = express.Router();
const userController = new UserController();

router.post('/register',userController.addUser);

module.exports = router;