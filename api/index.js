require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose');
const v1 = require('../routes/v1/index');
const app = express()
const cors = require('cors');


// ✅ Apply CORS Middleware
app.use(cors({
    origin: '*',  // Allows requests from any origin (use specific domains in production)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization','accessToken'],
    exposedHeaders: ["accessToken"] // <-- Expose accessToken so the browser can read it
}));

app.use(express.json());
app.use('/api/v1',v1);

const port = process.env.PORT || 3025

app.get('/',(req,res)=>{
    res.send(`Server is running on port ${port} server`);
});   

// mongoose.connect(process.env.DB_PATH)
// .then(()=>{
//     console.log('Connected to Db');
//     app.listen(port,()=>{
//         console.log('Server is running  on port '+port);
//     });   
    
// })
// .catch((error)=>{
//     console.log(`Db connection fail due to ${error.message}`);
// });

// Connect to DB only once at cold start
let isConnected = false;

async function connectToDB() {
    if (isConnected) return;
    await mongoose.connect(process.env.DB_PATH);
    isConnected = true;
}

// Export the handler for Vercel
module.exports = async (req, res) => {
    console.log('Connecting to Db');
    await connectToDB();
    console.log('Connected to Db');
    return app(req, res); // Pass request to Express
};
