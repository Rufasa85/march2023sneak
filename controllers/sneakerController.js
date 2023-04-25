const express = require("express");
const router = express.Router();
const fs = require("fs");
const uuid = require('uuid');

router.get('/', (req,res)=>{
    fs.readFile("./db/sneakers.json","utf-8",(err,data)=>{
        if(err){
            return res.status(500).json({msg:"error reading db"})
        } else {
            const dataArr = JSON.parse(data);
            return res.json(dataArr)
        }
    })
})

router.post('/', (req,res)=>{
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

router.get("/owner/:name",(req,res)=>{
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

router.get("/:sneakId",(req,res)=>{
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

module.exports = router;