const mongoose = require('mongoose');

const DATABASE = "mongodb://localhost:27017/test"

mongoose
    .connect(DATABASE)
    .then(()=>{
        console.log("Datbase connected!")
    })
    .catch(()=>{
        console.log("Datbase connection error!")
    })