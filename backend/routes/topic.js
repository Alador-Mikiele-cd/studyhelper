const express = require('express')
const router = express.Router()
const Topic = require('../model/topic')


router.post('/',async (req,res) => {
    try{
        const topic = await Topic.create(req.body)

        res.status(201).json(topic)
    }catch(err){
        res.status(400).json({err: err.message})
    }
    
})

router.post('/bulk',async (req,res) => {
    try{
        const topic = await Topic.insertMany(req.body)

        res.status(201).json(topic)
    }catch(err){
        res.status(400).json({err: err.message})
    }
})

router.get('/' , async (req,res) => {
    try{
       const topic = await Topic.find().populate('subjectId')
       res.json(topic)
    }catch(err){
        res.status(500).json({err : err.message})
    }
})

router.get('/:id', async (req, res) => {
    try {
        const topic = await Topic.findById(req.params.id)
        if (!topic) return res.status(404).json({ message: 'Not found' })
        res.json(topic)
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
})

router.put('/:id' , async (req,res) => {
    try{
      const {id} = req.params
      const topic = await Topic.findByIdAndUpdate(id , req.body , {new : true})
      if (!topic) return res.status(404).json({ message: 'Not found' })
      res.json(topic)
    }catch(err){
        res.status(400).json({err : err.message})
    }
})

router.delete('/:id',async (req,res) => {
    try{
    const {id} = req.params
    const topic = await Topic.findByIdAndDelete(id)
    if(!topic) return res.status(500).json({message: "something went worng"})
    res.json({message:"Deleted"})
    }catch(err){
        res.status(404).json({err: err.message})
    }
    
})
module.exports = router

// eng 6a5117b80f8c939f7526d694
// che 6a51185dac16ac42775acd60
// phy 6a511866ac16ac42775acd6