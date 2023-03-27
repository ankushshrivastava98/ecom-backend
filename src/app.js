const express = require('express');
const app = express();
require("./DBConnection/conn")
const port = process.env.PORT || 8080;

app.listen(port,()=>{
    console.log(`Connection is setup at Port ${port}`);
})