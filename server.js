const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const db = require('./app/connection.js')

const app = express()

var corsOptions = {
    origin: "http://localhost/5000"
}

app.use(cors(corsOptions))

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extened: true }))

const force = false

db.sequelize.sync({ force })
    .then(() => {
        console.log("Successfully created tables")
        if (force) {
            db.channels.create({ name: "Welcome", description: "Welcome channel for new users" })
            db.channels.create({ name: "Test Channel 1", description: "Test channel 1 for users" })
            db.channels.create({ name: "Test Channel 2", description: "Test channel 2 for users" })
        }
    })
    .catch(err => {
        console.log(err.message)
    })

require("./app/Routes/user.routes.js")(app)
require("./app/Routes/channel.routes.js")(app)

const PORT = process.env.serverPort || 8000

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}.`)
})