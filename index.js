const express = require("express");
const app = express();

app.use(express.static("public"))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const allRoutes = require("./controllers");
app.use(allRoutes)

app.listen(3000,()=>{
    console.log("listening on port 3000!")
})