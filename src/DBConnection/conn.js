const monngoose = require('mongoose');
monngoose.connect("mongodb://localhost/:2701").then(()=>{
    console.log("Mongo Connection is setup successfully");
}).catch((err)=>{
    console.log("Mongo Connection failed");
    console.log("Mongo error-log:",err);
})