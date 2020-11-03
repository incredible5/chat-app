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
    const channel = req.params.channelName
    var condition = channel ? {
        name: {
            [Op.like]: `%${channel}%`
        }
    } : null
    let selectedChannel = await channels.findAll({ attributes: ['id', 'name', 'description'], where: condition })
    res.send(selectedChannel)
}