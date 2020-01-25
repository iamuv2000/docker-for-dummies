const mongoose = require('mongoose');

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