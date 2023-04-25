const express = require("express");
const path = require("path")
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

app.use(express.static("public"))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/",(req,res)=>{
    // res.send("Welcome to the home page")
   res.sendFile(path.join(__dirname,"./views/index.html"))
})

app.get('/api/sneakers', (req,res)=>{
    res.json(sneakers)
})

app.post('/api/sneakers', (req,res)=>{
    console.log(req.body)
    sneakers.push(req.body)
   res.send("posted sneaker")
})

app.get("/api/sneakers/owner/:name",(req,res)=>{
    const ownerName = req.params.name;
    const filteredShoes = sneakers.filter(shoe=>{
        return shoe.owner === ownerName;
    })
    return res.json(filteredShoes);
})

app.get("/api/sneakers/:sneakId",(req,res)=>{
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

app.listen(3000,()=>{
    console.log("listening on port 3000!")
})