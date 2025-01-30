require('dotenv').config()
const express=require('express')
const mongoose= require('mongoose')
const workRoutes=require('./routes/workouts')

//express app 
const app=express()

//Middleware
app.use(express.json())

app.use((req, res, next) => {    
   console.log(req.path, req.method)
   next()
})

//Routes
app.use('/api/workouts',workRoutes)

//Connect to Database
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    //Listen for request
app.listen(process.env.PORT, ()=>{
    console.log('Connected to DB and Listening on port', process.env.PORT)
})

})
.catch(()=>{
    console.log(console.error())
})

