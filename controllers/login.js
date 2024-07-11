const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
    const {userName , pass} = req.body

    const user = await User.find({userName})

    const passOk = user === null
        ? false
        : await bcrypt.compare(pass, user.passwordHash)
    if(! (user && passOk)){
        res.status(401).json({
            error: 'invalid username or password'
          })
    }

    const userForToken = {
        userName: user.userName,
        id: user._id,
    }

    const token = jwt.sign(
        userForToken,
        process.env.SECRET,
        { expiresIn: 60*60 }
    )

    res
    .status(200)
    .send({token, userName: user.userName, name: user.name})
})
module.exports = loginRouter