const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
require('dotenv').config()
const Note = require('./src/models/note')


app.use(cors())
app.use(express.json())




app.get('/', (req, res) => {
    res.send('<h1>hello world</h1>')
})

app.get('/api/notes/:id', (req, res) => {
    Note.findById(req.params.id).then(note => {
        if(note) {
            res.json(note)
        }else{
            res.status(404).end()
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).send({ error : "malformated id"})
    })
})

app.delete('/api/notes/:id', (req,res) => {
    const id = req.params.id
    notes = notes.filter(note => note.id !== Number(id))
    res.status(204).end()
})
const generateId = () => {
    const maxId = notes.length > 0 ? 
    Math.max(...notes.map(n => n.id)) : 0
    return maxId + 1
}

app.post('/api/notes', (req, res) => {
    const body = req.body
    if(body.content ===  undefined) {
        return res.status(400).json({error : "missing content"})
    }

    const note  =  new Note({
        content : body.content,
        important : body.important || false,
        date : new Date(),
    })

    note.save().then(savedNote => {
        res.json(savedNote)
    })

})

app.get('/api/notes', (req,res) => {
    Note.find({}).then(notes => {
        res.json(notes)
    })
})
const PORT = process.env.PORT 
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})
