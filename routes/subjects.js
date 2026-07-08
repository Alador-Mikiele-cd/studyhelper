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

router.get('/:id', async (req, res) => {
    try {
        const subject = await Subject.findById(req.params.id)
        if (!subject) return res.status(404).json({ error: 'Not found' })
        res.json(subject)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})


router.put('/:id', async (req, res) => {
    try {
        const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!subject) return res.status(404).json({ error: 'Not found' })
        res.json(subject)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const subject = await Subject.findByIdAndDelete(req.params.id)
        if (!subject) return res.status(404).json({ error: 'Not found' })
        res.json({ message: 'Deleted' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})
module.exports = router