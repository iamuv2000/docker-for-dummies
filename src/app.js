const express = require("express")
const app = express()

app.get('/',(req,res)=>{
    res.json({
        message: "You are visiting root!"
    })
})

app.get('/signup',(req,res)=>{
    res.json({
        message: "You are visiting signup route!"
    })
})


app.listen(8000,()=>{
    console.log("Server is running on 8000")
})