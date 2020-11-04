module.exports = app => {
    const channels = require("../Controllers/channel.controller.js")

    app.get("/channels/", channels.findAll)

    app.get("/channels/:channelID", channels.findOne)

    app.post("/channels/", channels.create)
}