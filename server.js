require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = 3000
const Subscriber = require('./models/subscriber')


app.set("view engine", "ejs")
app.use(express.static('views')) //lets our server accept STATIC CSS files
app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log("Database Connected!"))

const subscribersRoute = require('./routes/subscribers.js')
app.use('/subscribers', subscribersRoute)

app.use(express.json()) // lets our server accept json elements
app.get('/', async(req, res) => {
try{
const count=await Subscriber.countDocuments()
 res.render('home',{count})
}
catch(error){
res.status(500).json({message: 'Error loading dashboard'})
}
 
})
app.get('/new', (req, res) => {
    res.render('index', {
        alert: null
    })
})

app.listen(PORT, () => {
    console.log(`Listenin on ${PORT}`)
})
