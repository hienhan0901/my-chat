const router = require('express').Router()
const conversationsModel = require('../models/conversation')


router.get('/find/:user', async (req, res) => {
    try {
        const conversation = await conversationsModel.find({
            members: { $in: [req.params.user] }
        })
        res.status(200).json(conversation)
    } catch (e) {
        res.status(500).json(e)
    }
})

router.get("/find/:firstUser/:secondUser", async (req, res) => {
    try {
        const conversation = await conversationsModel.findOne({
            members: { $all: [req.params.firstUser, req.params.secondUser] },
        }); 0
        res.status(200).json(conversation)
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/:user', async (req, res) => {
    try {
        const conversation = new conversationsModel({
            members: [
                req.params.user,
                req.body.receiver,
            ]
        })

        const newConversation = await conversation.save()
        res.status(200).json(newConversation)
    } catch (e) {
        res.status(500).json(e)
    }
})

module.exports = router