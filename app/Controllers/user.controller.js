const db = require('../connection')

const Users = db.users
const Channels = db.channels
const Op = db.Sequelize.Op

exports.create = async(req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        res.status(400).send({
            message: "Invalid tokens"
        })
        return;
    }
    try {
        const user = await Users.create({ name: req.body.name, email: req.body.email, password: req.body.password })
        const welcomeChannel = await Channels.findOne({ where: { name: 'Welcome' } })
        user.addChannels(welcomeChannel)
        res.send(user)
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating user"

        })
    }
}

exports.getUser = async(req, res) => {
    const name = req.query.userName
    const user = await Users.findOne({ where: { name } })
    res.send(user)
}

exports.findUsersWithinChannel = async(req, res) => {
    const channelName = req.query.channelName
    const userID = req.query.userID

    try {
        const user = await Users.findByPk(userID)
        const channel = await Channels.findOne({ attributes: ['id'], where: { name: channelName } })
        await user.addChannels(channel)

        const availableChannels = await Channels.findAll({
            include: [Users],
            where: { name: channelName }
        })
        res.send(availableChannels)
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating user"

        })
    }
}