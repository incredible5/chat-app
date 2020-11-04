const db = require('../connection')

const channels = db.channels
const Op = require('sequelize').Op

exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "Channel name cannot be empty"
        })
        return;
    }

    channels.create({ name: req.body.name, description: req.body.description.trim() })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating channel"
            })
        })
}

exports.findAll = (req, res) => {
    channels.findAll()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while fetching channels"
            })
        })
}

exports.findOne = async(req, res) => {
    const channelID = req.params.channelID
    let selectedChannel = await channels.findByPk(channelID)
    res.send(selectedChannel)
}

exports.findParticipants = async(req, res) => {
    res.send("ok")
}