const express = require("express");
const app = express();

app.get("/",(req,res)=>{
    res.send("Welcome to the home page")
})

app.get('/sneakers', (req,res)=>{
    res.json([
        {
            name:"Converse All Stars",
            color:"Red"
        },
        {
            name:"Air Jordans",
            color:"White"
        },
    ])
})

app.listen(3000,()=>{
    console.log("listening on port 3000!")
})