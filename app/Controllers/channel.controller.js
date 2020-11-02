const db = require('../connection')

const channels = db.channels
const Op = db.Sequelize.Op
exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "Channel name cannot be empty"
        })
        return;
    }

    // let description = ""
    // if (req.body.description.trim()) {
    //     description = req.body.description.trim()
    // }

    // const channel = {
    //     name: req.body.name,
    //     description: description
    // }

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