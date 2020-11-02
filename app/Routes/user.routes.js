module.exports = app => {
    const channels = require("../Controllers/channel.controller.js")

    app.get('/users/', channels.findAll)

    app.post('/users/', channels.create)
}