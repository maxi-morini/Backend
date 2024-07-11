const {test, after, beforeEach, describe} = require('node:test')
const assert = require('node:assert')
const bcyrpt = require('bcrypt')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const User = require('../models/user')
const supertest = require('supertest')

const app =require('../app')
const api = supertest(app)

describe('when there is initially one user in db', () =>{
    beforeEach(async () =>{
        await User.deleteMany({})
        const passwordHash = await bcyrpt.hash('sekret' ,10)
        const user = new User({userName: 'root', passwordHash})

        await user.save()
        
    })
test('crear un usuario' , async () =>{
    const usersAtStart  = await helper.usersInDb()

    const newUser = {
        userName : 'coso',
        name : 'cosito',
        password : 'pass'
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.userName)
    assert(usernames.includes(newUser.userName))
    })
test('creation fails with proper statuscode and message if username already taken', 
    async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          userName: 'root',
          name: 'Superuser',
          password: 'salainen',
        }
    
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
    
        const usersAtEnd = await helper.usersInDb()
        assert(result.body.error.includes('expected `username` to be unique'))
    
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
      })
})



after(async () => {
    await mongoose.connection.close()
})