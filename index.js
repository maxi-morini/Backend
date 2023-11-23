const express = require('express')
const cors = require('cors')
const app = express()

let notes = [
    {
        id:1,
        content:'HTML is easy',
        important: true
    },
    {
        id:2,
        content:'Browser can execute only JavaScript',
        important: false
    },
    {
        id:3,
        content:'GET and POST are the most important methods of HTTP protocol',
        important: true
    }
]


app.use(express.json())
app.use(cors())
app.get('/',(req, res)=>{
    res.send('<h1>Hello worldango</h1>')
}) 
app.get('/api/notes',(req,res)=>{
    res.json(notes)
})
app.get('/api/notes/:id',(req,res)=>{
    const id =Number(req.params.id)
    const note = notes.find(n => n.id===id)
    note ? res.json(note) : res.status(404).end()
})
app.delete('/api/notes/:id',(req,res)=>{
    const id =Number(req.params.id)
    notes = notes.filter(n => n.id===id)
    res.status(204).end()

})

const generadorId = () =>{
    const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0
    return maxId +1 
}


app.post('/api/notes',(req,res)=>{

    const body  = req.body
    if(!body.content){
        return res.status(400).json({error: 'contenido perdido'})
    }

    const note = {
        content : body.content,
        important : body.important || false,
        id : generadorId(),
    }

    notes = notes.concat(note)
    res.json(note)

})

app.put('/api/notes/:id',(req,res)=>{
    const id =Number(req.params.id)
    const body = req.body

    const newObj = {
        id : body.id,
        content : body.content,
        important : body.important
    }
    notes = notes.map(n => n.id !== id? n : newObj)
    res.json(notes)
})

const endPointDesconocido = (req,res)=>{
    res.status(400).send({error : "endpoint desconocido"})
}

app.use(endPointDesconocido)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => 
    console.log(`server running on port ${PORT}`))