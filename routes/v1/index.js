const express =require('express');
const UserRoute = require('../v1/user-routes');
const noteRouter = require('./note-routes');
const router = express.Router();

router.use('/user',UserRoute);
router.use('/note',noteRouter);

module.exports = router;