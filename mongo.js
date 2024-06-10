const mongoose = require('mongoose')

if(process.argv.length<3){
    console.log('dame un argumento');
    process.exit(1)
}

const pass = process.argv[2]

mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content : {
      type: String,
      minLength: 5,
      required: true
    },
    important : Boolean,
})
Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})

const Note = mongoose.model('Note',noteSchema)

// const note = new Note({
//     content:'GET and POST are the most important methods of HTTP protocol',
//         important: true,
// })

// note.save().then(
//     result => {
//         console.log('nota guardada');
//         mongoose.connection.close()
//     }
// )

