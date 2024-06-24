const express = require("express")

const { Users } = require("./db")

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req,res) => {
    res.send("Hello")
})

app.listen(port,()=>{
    console.log(`Server started at port ${port}`)
})

