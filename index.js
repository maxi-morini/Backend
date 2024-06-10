require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()

const Note = require('./models/note')

app.use(express.static('dist'))

const pass = process.argv[2]


mongoose.set('strictQuery',false)

const noteSchema = new mongoose.Schema({
    content : String,
    important : Boolean,
})

noteSchema.set('toJSON',{
            transform : (document,returnedObject) => {
                returnedObject.id = returnedObject._id.toString()
                delete returnedObject._id
                delete returnedObject.__v }
})



// let notes = [
//     {
//         id:1,
//         content:'HTML is easy',
//         important: true
//     },
//     {
//         id:2,
//         content:'Browser can execute only JavaScript',
//         important: false
//     },
//     {
//         id:3,
//         content:'GET and POST are the most important methods of HTTP protocol',
//         important: true
//     }
// ]


app.use(express.json())
app.use(cors())
app.get('/',(req, res)=>{
    res.send('<h1>Hello worldango</h1>')
}) 
app.post('/api/notes',(req, res, next)=>{
    const body = req.body
    const note = new Note({
        content: body.content,
        important: body.important || false,
    })
    
    note.save()
    .then(savedNote => {
        res.json(savedNote)
    })
    .catch(err=> next(err))
})
app.get('/api/notes',(req ,res ,next)=>{
    Note.find({}).then(notes=>{
        console.log(notes);
        res.json(notes)
    })   
})
app.get('/api/notes/:id',(req,res)=>{
    Note.findById(request.params.id)
    .then(note => {
        if(note){
            res.json(note)
        }
        else{
            res.status(404).end()
        }
      })
    .catch( err =>next(err))
})
app.delete('/api/notes/:id',( req , res, next)=>{
    Note.findByIdAndDelete(req.params.id)
    .then(result =>{
        res.status(204).end()
    })
    .catch(error => next(error))
})

const generadorId = () =>{
    const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0
    return maxId +1 
}



app.put('/api/notes/:id',(req,res, next)=>{
    
    const {content , important } =req.body

    Note.findByIdAndUpdate(
        req.params.id,
        {content , important },
        {new : true, runValidators : true, context: 'query' }
    )
    .then(updatedNote => {
        response.json(updatedNote)
      })
      .catch(error => next(error))
})

const endPointDesconocido = (req,res)=>{
    res.status(400).send({error : "endpoint desconocido"})
}

app.use(endPointDesconocido)

const errorHandler = ( error , request , response , next ) => {
    console.error(error.message)

    if(error.name === "CastError") {
        return response.status(400).send({ error: 'malformatted id' })
    }
    else if(error.name === "ValidationError"){
        return response.status(400).json({ error: error.message })
    }
    
    next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => 
    console.log(`server running on port ${PORT}`),
    console.log('nuevo'))