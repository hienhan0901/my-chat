const router = require('express').Router()
const userModel = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/register', async (req, res) => {
    try {
        const newUser = new userModel({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 10)
        })

        const user = await newUser.save()
        res.status(200).json(user)
    } catch (e) {
        res.status(500).json(e)
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await userModel.findOne({ username: req.body.username })
        // !user && res.status(404).json('user not found')

        if (!user) throw ("user not found")


        if (bcrypt.compareSync(req.body.password, user.password)) {
            const accessToken = jwt.sign(
                {
                    id: user.id,
                },
                'hienhan0901',
                {
                    expiresIn: '30d'
                })
            res.status(200).json({ accessToken, user })
        } else {
            throw ("invalid password")
        }
    }
    catch (e) {
        res.status(500).json(e)
    }
})

module.exports = router