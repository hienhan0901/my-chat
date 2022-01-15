const router = require('express').Router()
const usersModel = require('../models/user')

router.get('/:username', async (req, res) => {
    try {
        const users = await usersModel.find({
            username: new RegExp(req.params.username, 'i')
        })

        res.status(200).json(users)
    } catch (e) {
        res.status(500).json(e)
    }
})

module.exports = router