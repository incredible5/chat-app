module.exports = app => {
    const messages = require("../Controllers/message.controller.js")

    app.get("/messages/:channelName", messages.findMessagesWithinChannel)

    app.post("/messages/", messages.create)
}