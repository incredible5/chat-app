module.exports = (sequelize, Sequelize) => {
    const users = sequelize.define('Users', {
        name: {
            type: Sequelize.STRING(40),
            allowNull: false
        },
        email: {
            type: Sequelize.STRING(40),
            allowNull: false,
            unique: true

        },
        password: {
            type: Sequelize.STRING(40),
            allowNull: false
        }
    }, {
        timestamps: false
    })
    return users
}