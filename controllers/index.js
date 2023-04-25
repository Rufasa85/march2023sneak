const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/",(req,res)=>{
    // res.send("Welcome to the home page")
   res.sendFile(path.join(__dirname,"../views/index.html"))
})

const sneakerRoutes = require("./sneakerController");
router.use("/api/sneakers",sneakerRoutes)

const shirtsRoutes = require("./shirtsController");
router.use("/api/shirts",shirtsRoutes)

module.exports = router