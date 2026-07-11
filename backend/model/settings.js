const mongoose = require('mongoose')

const settingSchema = new mongoose.Schema({
    targetScore:Number,
    stream:String
})

const Settings = mongoose.model('Settings',settingSchema)

module.exports = Settings