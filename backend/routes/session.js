const express = require('express')
const router = express.Router()
const Session = require('../model/studysession')
const Topic = require('../model/topic')


router.post('/',async (req,res) => {
    try{
       const session = await Session.create(req.body)
       await Topic.findByIdAndUpdate(req.body.topicId, { lastReviewedAt: new Date() })
       res.status(201).json(session)
    }catch(err){
        res.status(400).json({err : err.message})
    }
})

router.get('/' , async (req , res) => {
    try{
      const session = await Session.find().populate('subjectId').populate('topicId')
      res.json(session)
    }catch(err){
        res.status(500).json({err : err.message})
    }
})
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const session = await Session.findByIdAndUpdate(id, req.body, { new: true })
        if (!session) return res.status(404).json({ message: 'Not found' })
        res.json(session)
    } catch (err) {
        res.status(400).json({ err: err.message })
    }
})

router.delete('/:id',async (req,res) => {
    try{
    const {id} = req.params
    const session = await Session.findByIdAndDelete(id)
    if(!session) return res.status(500).json({message: "something went worng"})
    res.json({message:"Deleted"})
    }catch(err){
        res.status(404).json({err: err.message})
    }
    
})
module.exports = router