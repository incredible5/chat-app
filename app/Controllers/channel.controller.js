const db = require('../connection')

const Channels = db.channels
const Users = db.users
const Op = require('sequelize').Op

exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "Channel name cannot be empty"
        })
        return;
    }

    Channels.create({ name: req.body.name, description: req.body.description.trim() })
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
    Channels.findAll()
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
    let selectedChannel = await Channels.findByPk(channelID)
    res.send(selectedChannel)
}

exports.findParticipants = async(req, res) => {
    const channelID = req.params.channelID
    const userID = req.params.userID
    try {
        const user = await Users.findByPk(userID)
        const channel = await Channels.findByPk(channelID)
        await user.addChannels(channel)

        const availableChannels = await Channels.findAll({
            include: [Users],
            where: { id: channelID }
        })
        res.send(availableChannels)
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating user"

        })
    }
}