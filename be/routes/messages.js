const router = require('express').Router()
const messagesModel = require('../models/message')
const authMdw = require('../middlewares/auth.mdw')

router.get("/:conversationId", async (req, res) => {
    try {
        const messages = await messagesModel.find({
            conversationId: req.params.conversationId,
        });
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/", authMdw.userAuth, async (req, res) => {
    const newMessage = new messagesModel(req.body);

    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router