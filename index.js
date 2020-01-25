const mongoose = require('mongoose');
const express = require('express')
const app = express();
const DATABASE = "mongodb://mymongo:27017/test" 
/*mongodb://<name-of-mongo-contianer>:27017/test*/

mongoose
    .connect(DATABASE)
    .then(()=>{
        console.log("Datbase connected!")
    })
    .catch(()=>{
        console.log("Datbase connection error!")
    })

app.get('/',(req,res)=>{
    res.json({
        message: "You are on root route"
    })
})

app.listen(8000,()=>console.log("Listening at port 8000..."))