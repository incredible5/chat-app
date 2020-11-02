module.exports = app => {
    const channels = require("../Controllers/channel.controller.js")

    app.get('/', channels.findAll)

    app.post('/', channels.create)
}