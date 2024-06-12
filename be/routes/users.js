const router = require('express').Router()
const usersModel = require('../models/user')

router.get('/get-username/:id', async (req, res) => {
    try {
        const user = await usersModel.findOne({
            _id: req.params.id
        })

        res.status(200).json(user.username)
    } catch (e) {
        res.status(500).json(e)
    }
})

router.get('/:username/:myName', async (req, res) => {
    try {
        const users = await usersModel.find({
            username: new RegExp(req.params.username, 'i')
        })

        const users1 = users.filter(u => u.username !== req.params.myName)

        res.status(200).json(users1)
    } catch (e) {
        res.status(500).json(e)
    }
})
module.exports = router