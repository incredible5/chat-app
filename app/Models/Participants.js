module.exports = (sequelize, Sequelize) => {
    const channels = sequelize.define('Participants', {
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        channel_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        }
    }, {
        timestamps: false
    })
    return channels
}