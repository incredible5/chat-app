module.exports = app => {
    const users = require("../Controllers/user.controller.js")

    app.get('/user/:userID', users.getUser)

    app.post('/users/', users.create)
}