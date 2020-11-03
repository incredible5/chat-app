require('dotenv').config()
const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.dbName, process.env.dbUser, process.env.dbPassword, {
    host: process.env.host,
    port: process.env.port,
    dialect: "mysql",
    logging: false
})

const db = {}

db.Sequelize = sequelize
db.sequelize = sequelize

db.users = require('./Models/Users.js')(sequelize, Sequelize)
db.channels = require('./Models/Channels.js')(sequelize, Sequelize)
db.messages = require('./Models/Messages.js')(sequelize, Sequelize)
    // db.participants = require('./Models/Participants')(sequelize, Sequelize)

sequelize.authenticate()
    .then(() => {
        console.log(`Successfully connected to Database "${process.env.dbName}"`)
    })
    .catch((err) => {
        console.log(err)
    })

db.users.hasMany(db.messages, { as: "messages" })
db.messages.belongsTo(db.users, {
    foreignKey: "user_id",
    as: "user"
})

db.channels.hasMany(db.messages, { as: "messages" })
db.messages.belongsTo(db.channels, {
    foreignKey: "channel_id",
    as: "channel"
})

db.users.belongsToMany(db.channels, { through: "Participants" });

db.channels.belongsToMany(db.users, { through: "Participants" });

module.exports = db