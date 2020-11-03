module.exports = app => {
    const channels = require("../Controllers/channel.controller.js")

    app.get("/channels/", channels.findAll)

    app.get("/channels/:channelName", channels.findOne)

    app.post("/channels/", channels.create)
}