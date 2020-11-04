const db = require('../connection')

const Messages = db.messages
const Channels = db.channels
const Users = db.users
const Op = require('sequelize').Op

exports.create = (req, res) => {
    Messages.create({ user_id: req.body.userID, channel_id: req.body.channelID, message: req.body.message })
        .then(message => res.send(message))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while delivering message"
            })
        })
}

exports.findMessagesWithinChannel = async(req, res) => {
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
}