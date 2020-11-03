module.exports = app => {
    const messages = require("../Controllers/channel.controller.js")

    app.get("/message/", messages.findAll)

    app.post("/message/", messages.create)
}