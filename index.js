const express = require("express");
const app = express();
const sneakers = [
    {
        id:1,
        owner:"Joe",
        name:"Converse All Stars",
        color:"red"
    },
    {   
        id:2,
        owner:"Joe",
        name:"Air Jordans",
        color:"white"
    },
    {
        id:3,
        owner:"Tom",
        name:"Birkenstocks",
        color:"brown"
    },
    {
        id:4,
        owner:"Shiva",
        name:"CatPaw",
        color:"orange"
    }
]

app.get("/",(req,res)=>{
    res.send("Welcome to the home page")
})

app.get('/sneakers', (req,res)=>{
    res.json(sneakers)
})

app.get("/sneakers/:sneakId",(req,res)=>{
    const sneakId = req.params.sneakId;
    for (let i = 0; i < sneakers.length; i++) {
        if(sneakers[i].id==sneakId){
            return res.json(sneakers[i])
        }   
    }
    return res.status(404).json({
        msg:"no such sneaker!"
    })
})

// app.get("/sneakers/1",(req,res)=>{
//     res.json(sneakers[0])
// })

// app.get("/sneakers/2",(req,res)=>{
//     res.json(sneakers[1])
// })

// app.get("/sneakers/3",(req,res)=>{
//     res.json(sneakers[2])
// })

app.listen(3000,()=>{
    console.log("listening on port 3000!")
})