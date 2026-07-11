const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const subjectRoutes = require('./routes/subjects')
const topicRoutes = require('./routes/topic')
const sessionRoutes = require('./routes/session')
const settingsRoutes = require('./routes/setting')   


app.use(cors())
app.use(express.json()) 

app.use('/api/settings', settingsRoutes)
app.use('/api/subjects', subjectRoutes)
app.use('/api/topic/',topicRoutes)
app.use('/api/session/',sessionRoutes)


mongoose.connect(process.env.MONGO_URI)
        .then(()=>{
            console.log('mongodb connected')
            app.listen(8000 , console.log('server rungin on ' + process.env.PORT ))
        })