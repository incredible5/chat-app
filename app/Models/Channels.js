module.exports = (sequelize, Sequelize) => {
    const channels = sequelize.define('Channels', {
        name: {
            type: Sequelize.STRING(40),
            allowNull: false
        },
        description: {
            type: Sequelize.STRING(200),
            allowNull: false,
            defaultValue: 'No description provided'
        }
    }, {
        timestamps: false
    })
    return channels
}