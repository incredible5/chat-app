module.exports = app => {
    const users = require("../Controllers/user.controller.js")
    app.get('/users/', users.findUsersWithinChannel)

    app.post('/users/', users.create)
}