module.exports = (sequelize, Sequelize) => {
    const messages = sequelize.define('Messages', {
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        channel_id: {
            type: Sequelize.INTEGER,
            allowNull: false

        },
        message: {
            type: Sequelize.STRING(400),
            allowNull: false
        }
    }, {
        timestamps: false
    })
    return messages
}