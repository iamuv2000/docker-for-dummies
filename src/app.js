const express = require("express")
const app = express()

app.get('/',(req,res)=>{
    res.send("<h1>Visiting root!</h1>")
})

app.listen(8000,()=>{
    console.log("Server is running on 8000")
})