const express = require('express')
const router = express.Router()
const Topic = require('../model/topic')

router.post('/',async (req,res) => {
    try{
           
    }catch(err){
        res.status(400).json({err: err.message})
    }
    
})