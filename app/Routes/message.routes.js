module.exports = app => {
    const messages = require("../Controllers/message.controller.js")

    app.get("/messages/", messages.findMessagesWithinChannel)

    app.post("/messages/:name", messages.create)
}