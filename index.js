const express = require("express");
 const uuid = require('uuid');
const path = require("path");
const fs = require("fs");
const app = express();


app.use(express.static("public"))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/",(req,res)=>{
    // res.send("Welcome to the home page")
   res.sendFile(path.join(__dirname,"./views/index.html"))
})

app.get('/api/sneakers', (req,res)=>{
    fs.readFile("./db/sneakers.json","utf-8",(err,data)=>{
        if(err){
            return res.status(500).json({msg:"error reading db"})
        } else {
            const dataArr = JSON.parse(data);
            return res.json(dataArr)
        }
    })
})

app.post('/api/sneakers', (req,res)=>{
    fs.readFile("./db/sneakers.json","utf-8",(err,data)=>{
        if(err){
            return res.status(500).json({msg:"error reading db"})
        } else {
            const dataArr = JSON.parse(data);
            const newShoe = {
                id:uuid.v4(),
                owner:req.body.owner,
                name:req.body.name,
                color:req.body.color
            }
            console.log(newShoe)
            dataArr.push(newShoe)
           fs.writeFile("./db/sneakers.json",JSON.stringify(dataArr,null,4),(err)=>{
            if(err){
                return res.status(500).json({msg:"error writing db"})
            } else {
                return res.json(newShoe)
            }
           })
        }
    })
})

app.get("/api/sneakers/owner/:name",(req,res)=>{
    fs.readFile("./db/sneakers.json","utf-8",(err,data)=>{
        if(err){
            return res.status(500).json({msg:"error reading db"})
        } else {
            const sneakers = JSON.parse(data);

            const ownerName = req.params.name;
            const filteredShoes = sneakers.filter(shoe=>{
                return shoe.owner === ownerName;
            })
            return res.json(filteredShoes);
        }
    })
})

app.get("/api/sneakers/:sneakId",(req,res)=>{
    fs.readFile("./db/sneakers.json","utf-8",(err,data)=>{
        if(err){
            return res.status(500).json({msg:"error reading db"})
        } else {
            const sneakers = JSON.parse(data);
            const sneakId = req.params.sneakId;
            for (let i = 0; i < sneakers.length; i++) {
                if(sneakers[i].id==sneakId){
                    return res.json(sneakers[i])
                }   
            }
            return res.status(404).json({
                msg:"no such sneaker!"
            })
        }
    })
})

app.listen(3000,()=>{
    console.log("listening on port 3000!")
})