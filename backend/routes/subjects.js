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

router.get('/',async (req,res) => {
    try{
    const subject = await Subject.find()
    res.status(200).json(subject)
    }
    catch(err){
        res.status(400).json({err : err.message})
    }
})


router.get('/:id',async (req,res) => {
    try{
       let{ id } = req.params
       const subject = await Subject.findById(id)
       if(!subject) res.status(400).json({err : err.message})
       res.status(201).json(subject)
    }catch(err){
        res.status(500).json({err : err.message})
    }
    
})


router.put('/:id',async (req,res) => {
    try{
        const{id} = req.params
        const subject = await Subject.findByIdAndUpdate(id , req.body , {new : true}) 
        if(!subject) res.status(500).json({err : err.message})
        res.json(subject)
    }catch(err){
        res.status(500).json({err : err.message})
    }
})

router.delete('/:id',async (req,res) => {
    try{
        const{id} = req.params
        const subject = await Subject.findByIdAndDelete(id) 
        if(!subject) res.status(500).json({err : err.message})
        res.json({message : 'Deleted'})
    }catch(err){
        res.status(500).json({err : err.message})
    }
})




module.exports = router