const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const subjectRoutes = require('./routes/subjects')

app.use(express.json()) 
app.use('/api/subjects', subjectRoutes)

mongoose.connect(process.env.MONGO_URI)
        .then(()=>{
            console.log('mongodb connected')
            app.listen(process.env.PORT , console.log('server rungin on ' + process.env.PORT ))
        })