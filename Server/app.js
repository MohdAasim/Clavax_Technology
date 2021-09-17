const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path:'./config.env'})
require('./DbConn/dbconn')


const PORT =process.env.PORT ||5000

//to understand the json data by our app
app.use(express.json())
app.use('/public',express.static('public'))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(require('./router/phoneroute'))
app.get('/',(req,res)=>{
   res.send("HEllo");
})

app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`)
})