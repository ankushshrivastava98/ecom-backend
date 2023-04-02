const express = require('express');
const app = express();
require("./DBConnection/conn")
const port = process.env.PORT || 8080;
const productRoute = require('./Routers/productRoute');
const orderRoute = require('./Routers/orderRoute');
const userRoute = require('./Routers/userRoute');
app.use(express.json());
app.use(productRoute);
app.use(orderRoute);
app.use(userRoute);
app.listen(port,()=>{
    console.log(`Connection is setup at Port ${port}`);
})