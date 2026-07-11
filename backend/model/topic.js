const mongoose = require('mongoose')


const topicShema = new mongoose.Schema({
     subjectId:{type: mongoose.Schema.Types.ObjectId , ref:'Subject'},
     name:String,
     status:String,
     lastReviewedAt:Date,
     grade:Number,
     unit:String,
})

const Topic = mongoose.model("Topic" , topicShema)

module.exports = Topic