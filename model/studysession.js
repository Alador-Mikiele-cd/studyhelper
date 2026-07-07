const mongoose = require('mongoose')

const studySessionSchema = new mongoose.Schema({
       subjectId : {type: mongoose.Schema.Types.ObjectId , ref:"Subject"},
       topicId : {type :mongodb.Schema.Types.ObjectId , ref :"Topic"},
       note:String,
       date:Date
       
})

const Subject = mongoose.model("Subject" , subjectSchema)
const Topic = mongoose.model("Topic" , topicShema)
const  StudySession = mongoose.model("StudySession" , studySessionSchema)

module.exports = StudySession