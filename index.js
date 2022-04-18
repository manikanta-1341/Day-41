const express = require('express');
const hall = require('./routes/hall')
const room = require('./routes/rooms')
const dotenv = require('dotenv');
const mongo = require('./shared/connect')
const app = express();
dotenv.config()
mongo.connect()
app.use(express.json());

app.use("/",(req,res, next)=>{
    next();
})

app.use('/hall',hall)

app.listen(process.env.port)