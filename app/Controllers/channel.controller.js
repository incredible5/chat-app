const Joi = require("joi")

const db = require('../connection')

const Channels = db.channels
const Users = db.users
const Op = require('sequelize').Op

exports.create = async(req, res) => {

    const channelSchema = Joi.object({
        name: Joi.string()
    })

    const { error } = await channelSchema.validate({ name: req.body.name })
    if (error) {
        res.status(400).send({
            message: "Invalid channel name"
        })
        return;
    }

    const channel = req.body.description ? req.body.description.trim() ? { name: req.body.name, description: req.body.description.trim() } : { name: req.body.name } : { name: req.body.name }

    Channels.create(channel)
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
    const channelIDSchema = Joi.object({
        channelID: Joi.number().positive().integer()
    })
    const channelID = req.params.channelID
    const { error } = channelIDSchema.validate({ channelID })
    if (error) {
        console.log(error)
        res.status(400).send({
            messsage: "Invalid channel ID"
        })
        return;
    }
    let selectedChannel = await Channels.findByPk(channelID)
    res.send(selectedChannel)
}

exports.findParticipants = async(req, res) => {
    const channelID = req.params.channelID
    const userID = req.params.userID

    const participantsSchema = Joi.object({
        userID: Joi.number().positive().integer(),
        channelID: Joi.number().positive().integer()
    })

    const { error } = participantsSchema.validate({ userID, channelID })
    if (error) {
        res.status(400).send({
            messgae: "Invalid data"
        })
        return;
    }

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