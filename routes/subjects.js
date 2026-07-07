const express = require('express')
const router = express.Router()
const Subject = require('../model/subject')

router.post('/',async(req,res) => {
   try{
     const subject = await Subject.create(req.body)
     res.status(201).json(subject)
   } catch(err){
     res.status(400).json({ error : err.message })
   }  
})

module.exports = router