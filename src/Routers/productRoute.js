const express = require('express');
const product =require('./../models/Product');

const router = express.Router();

router.post('/product', async (req,res)=>{
  console.log(req.body);
  const data = new product(req.body);
  const result = await data.save();
  if(!result){
    res.json({
        status:'FAILED',
        message:'unable to add product'
    })
  }else {
    res.json({
        status:'SUCCESS',
        message:'product added successfully',
        data:result,
    })
  }
})

module.exports = router;