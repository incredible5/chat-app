module.exports = app => {
    const messages = require("../Controllers/message.controller.js")

    app.get("/messages/:channelID", messages.findMessagesWithinChannel)

    app.post("/messages/", messages.create)
}