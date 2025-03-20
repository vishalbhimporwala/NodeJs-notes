const express =require('express');
const cors = require('cors');
const UserRoute = require('../v1/user-routes');
const noteRouter = require('./note-routes');
const router = express.Router();


// ✅ Apply CORS Middleware
router.use(cors({
    origin: '*',  // Allows requests from any origin (use specific domains in production)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization','accessToken'],
    exposedHeaders: ["accessToken"] // <-- Expose accessToken so the browser can read it
}));


router.use('/user',UserRoute);
router.use('/note',noteRouter);

module.exports = router;