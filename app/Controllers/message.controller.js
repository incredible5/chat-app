const db = require('../connection')

const messages = db.messages
const Op = db.Sequelize.Op

exports.create = (req, res) => {
    messages.create({ user_id: req.body.userID, channel_id: req.body.channelID, message: req.body.message })
        .then(message => res.send(message))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while delivering message"
            })
        })
}

exports.findMessagesWithinChannel = (req, res) => {
    //
}