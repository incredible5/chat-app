const { ref } = require('joi')
const Joi = require('joi')

const db = require('../connection')

const Messages = db.messages
const Channels = db.channels
const Users = db.users
const Op = require('sequelize').Op

exports.create = async(req, res) => {
    const messageSchema = Joi.object({
        user_id: Joi.number().integer().positive(),
        channel_id: Joi.number().integer().positive(),
        message: Joi.string()
    })
    const { error } = await messageSchema.validate({ user_id: req.body.userID, channel_id: req.body.channelID, message: req.body.message })
    if (error) {
        res.status(500).send({
            message: "Invalid token(s)"
        })
        return;
    }
    Messages.create({ user_id: req.body.userID, channel_id: req.body.channelID, message: req.body.message })
        .then(message => res.send(message))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while delivering message"
            })
        })
}

exports.findMessagesWithinChannel = async(req, res) => {
    const channelIDScehma = Joi.object({
        channelID: Joi.number().positive().integer()
    })
    const { error } = await channelIDScehma.validate({ channelID: req.params.channelID })
    try {
        if (error) {
            const errMSg = "Invalid channelID"
            throw new Error(errMSg)
        }
        const channel = await Channels.findByPk(req.params.channelID)
        const channelID = channel.toJSON()
        let channelMessages = await Messages.findAll({ attributes: ['user_id', 'message'], where: { channel_id: channelID.id } })
        const userIDs = channelMessages.reduce((acc, curr) => {
            acc.push(curr.user_id)
            return acc
        }, [])
        let users = await Users.findAll({ attributes: ['id', 'name'], where: { id: userIDs } })
        users = users.reduce((acc, curr) => {
            curr = curr.dataValues
            acc.push(curr)
            return acc
        }, [])
        const data = users.reduce((acc, curr) => {
            let message = channelMessages.find(el => el.dataValues.user_id === curr.id) //Returns whole msg object
            message = message.dataValues.message
            acc.push({ user_id: curr.id, name: curr.name, message })
            return acc
        }, [])
        res.send(data)
    } catch (err) {
        console.log(err.message)
        res.status(500).send({
            message: err.message || "Some error occurred while searching for messages"

        })
    }
}