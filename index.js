require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose');
const v1 = require('./routes/v1/index');
const app = express()

app.use(express.json());
app.use('/api/v1',v1);

const port = process.env.PORT || 3025

app.get('/',(req,res)=>{
    res.send(`Server is running on port ${port}3025 server`);
});   

mongoose.connect(process.env.DB_PATH)
.then(()=>{
    console.log('Connected to Db');
    app.listen(port,()=>{
        console.log('Server is running  on port '+port);
    });   
    
})
.catch((error)=>{
    console.log(`Db connection fail due to ${error.message}`);
});