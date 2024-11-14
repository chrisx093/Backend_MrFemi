const express = require('express')
const app = express()
require ('dotenv').config()
const PORT =process.env.PORT || 4700
const mongoose = require ('mongoose')
const mongodb_uri = process.env.URI
const cors = require('cors')
const bodyParser = require('body-parser')
app.use (cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

mongoose.connect(mongodb_uri)
.then(()=>{
    console.log ('Database connected');
})
.catch((err)=>{
    console.log (err);
})

const nigerianFoods=[
    {
        id:1,
        name: 'yam',
        price:100
    },

    {
        id:2,
        name: 'beans',
        price:200
    },
]


let userSchema = mongoose.Schema({
    item:String,
})

let userModel = mongoose.model ('users', userSchema)

app.get ('/home', (req, res)=>{
    res.send (nigerianFoods)
})

app.post ('/submit', (req, res)=>{
    console.log(req.body)
    const form = new userModel(req.body)
    form.save()
})

app.listen(PORT, ()=>{
    console.log (`Server is running ${PORT}`)
})