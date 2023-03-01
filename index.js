const express=require('express');
const body_parser=require('body-parser');
const app=express();
port=8080;
const api = require('./routes/router');

app.use(body_parser.json());

app.use('/api/v1/',api)

app.listen(port,()=>{
    console.log(`running on ${port}`)
})
