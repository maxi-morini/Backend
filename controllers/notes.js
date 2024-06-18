const notesRouter = require('express').Router()
const Note = require('../models/note')
const { error } = require('../utils/logger')

notesRouter.get('/',(req, res) => {
    Note.find({}).then(notes =>{
        res.json(notes)
    })
})

notesRouter.get('/:id',(req, res, next)=>{
    Note.findById(req.params.id)
    .then( note => {
        if(note){
            res.json(note)
        } else {
            res.status(404).end()
        }
    })
    .catch(error => next(error))
})

notesRouter.post('/',(req,res,next)=>{
    const body = req.body

    const note = new Note({
        content : body.content,
        important : body.important || false
    })
    note.save()
        .then(savedNote => {
            res.json(savedNote)
        })
        .catch(err => next(err))
})

notesRouter.delete('/:id', (req, res, next)=>{
    Note.findByIdAndDelete(req.params.id)
    .then(() => {
        res.status(204).end()
    })
    .catch(err => next(err))
})

notesRouter.put('/:id', (req, res, next)=>{
    const body = req.body

    const note = new Note({
        content: body.content,
        important: body.important,
    })

    Note.findByIdAndUpdate(req.params.id, note, { new:true })
    .then(updatedNote => {
        response.json(updatedNote)
      })
      .catch(error => next(error))
})

module.exports = notesRouter