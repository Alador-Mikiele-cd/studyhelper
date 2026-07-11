const express = require('express')
const router = express.Router()
const Setting = require('../model/settings')
router.post('/', async (req, res) => {
    try {
        const setting = await Setting.findOneAndUpdate({}, req.body, { new: true, upsert: true })
        res.json(setting)
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
})
router.get('/',async (req,res) => {
    try{
        const setting = await Setting.findOne()
        res.json(setting)
    }catch(err){
        res.status(200).json({err : err.message})        
    }
    
})

module.exports = router