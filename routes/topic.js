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

module.exports = router