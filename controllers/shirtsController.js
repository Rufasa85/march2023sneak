const express = require("express");
const router = express.Router();
const fs = require("fs");
const uuid = require('uuid');


router.get("/",(req,res)=>{
    fs.readFile("./db/shirts.json","utf-8",(err,data)=>{
        if(err){
            return res.status(500).json({msg:"error reading db"})
        } else {
            const dataArr = JSON.parse(data);
            return res.json(dataArr)
        }
    })
})

router.post('/', (req,res)=>{
    fs.readFile("./db/shirts.json","utf-8",(err,data)=>{
        if(err){
            return res.status(500).json({msg:"error reading db"})
        } else {
            const dataArr = JSON.parse(data);
            const newShirt = {
                id:uuid.v4(),
                owner:req.body.owner,
                style:req.body.style,
                color:req.body.color,
                print:req.body.print
            }
            console.log(newShirt)
            dataArr.push(newShirt)
           fs.writeFile("./db/shirts.json",JSON.stringify(dataArr,null,4),(err)=>{
            if(err){
                return res.status(500).json({msg:"error writing db"})
            } else {
                return res.json(newShirt)
            }
           })
        }
    })
})

module.exports = router;