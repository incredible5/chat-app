module.exports = app => {
    const users = require("../Controllers/user.controller.js")

    app.get('/user/:userID', users.getUser)

    app.get('/users/', users.findUsersWithinChannel)

    app.post('/users/', users.create)
}