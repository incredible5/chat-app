const db = require('../connection')

const users = db.users
const channels = db.channels
const paticipants = db.participants
const Op = db.Sequelize.Op

exports.create = async(req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        res.status(400).send({
            message: "Invalid tokens"
        })
        return;
    }
    try {
        const user = await users.create({ name: req.body.name, email: req.body.email, password: req.body.password })
        const welcomeChannel = await channels.findAll({ attributes: ['id'], where: { name: 'Welcome' } })
        user.addChannels(welcomeChannel)
        res.send(user)
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating user"

        })
    }
}
exports.findUsersWithinChannel = async(req, res) => {
    const channel = req.query.channelName
    console.log(channel)
    let welcomeChannelID = await channels.findAll({ attributes: ['id'], where: { name: channel } })
    welcomeChannelID = welcomeChannelID[0].dataValues.id
    users.findByPk({ where: condition })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while fetching users"
            })
        })
}