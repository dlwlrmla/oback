const mongoose = require('mongoose')
require('dotenv').config()
const url = process.env.MONGODB_URI


mongoose.connect(url)
.then(result => {
    console.log('connected to mongodb')
})
.catch((error) => {
    console.log('error connecting to mongoDB : ', error.message)
})

const noteSchema = new mongoose.Schema({
    content : String,
    date : Date,
    important : Boolean
})

const Note = mongoose.model('Note', noteSchema)

noteSchema.set('toJSON', {
    transform : (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Note', noteSchema ) 