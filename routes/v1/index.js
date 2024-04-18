const express =require('express');
const UserRoute = require('../v1/user-routes')
const router = express.Router();

router.use('/user',UserRoute);

module.exports = router;