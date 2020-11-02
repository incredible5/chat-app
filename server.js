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

db.sequelize.sync()
    .then(() => {
        console.log("Successfully created tables")
    })
    .catch(err => {
        console.log(err.message)
    })

require("./app/Routes/channel.routes.js")(app)

const PORT = process.env.serverPort || 8000

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}.`)
})