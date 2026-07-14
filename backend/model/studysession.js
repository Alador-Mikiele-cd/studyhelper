const mongoose = require('mongoose')

const studySessionSchema = new mongoose.Schema({
       subjectId : {type: mongoose.Schema.Types.ObjectId , ref:"Subject"},
       topicId : {type :mongoose.Schema.Types.ObjectId , ref :"Topic"},
       durationMinutes: Number,
       note:String,
       date:Date
       
})


const  StudySession = mongoose.model("StudySession" , studySessionSchema)

module.exports = StudySession

// 6a5117b80f8c939f7526d694
// 6a511cf25fef727b42b5d3a8