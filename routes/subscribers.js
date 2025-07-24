const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber.js')

// Getting all
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find() //finding all subs in db
        res.render('list', { subscribers, alert: null })
        // res.json(subscribers)
    }
    catch (error) {
        //error 500 means
        res.status(500).json({ message: error.message })
    }
})
// Getting one: Uses Middleware
router.get('/:id', getSubscriber, async (req, res) => {
    res.json(res.subscriber)
})
// Creating one
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        bday: req.body.bday,
        bio: req.body.bio
    })
    try {
        const newSubscriber = await subscriber.save()
         res.render('index', {
            alert: `Added New User: ${subscriber.name}`
        })
        //res.status(201).json(newSubscriber)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
// Updating one: Uses Middleware
router.patch('/edit/:id', getSubscriber, async (req, res) => {

})
// Deleting one: Uses Middleware
router.post('/delete/:id', getSubscriber, async (req, res) => {
    try {
        await Subscriber.deleteOne({ _id: res.subscriber._id })
        const subscribers = await Subscriber.find() //finding them all again to pass them to ejs.
        res.render('list', {
            alert: `Deleted User: ${res.subscriber.name}`,
            subscribers
        })
        // res.json({ message: `Deleted User: ${res.subscriber.name}}` })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
// MIDDLEWARE: This function gets the subscriber based on the id
async function getSubscriber(req, res, next) {
    let subscriber
    try {
        subscriber = await Subscriber.findById(req.params.id) // search for sub based on id in the database
        if (subscriber == null) {
            res.status(404).json({ message: 'Subscriber not found' })
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
    res.subscriber = subscriber // assigning this sub to a new JSON attribute of res
    next() //allows to move on to next midware or the actual request
}
module.exports = router
