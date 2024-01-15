const sequelize = require("./sequelize");
const { Model, DataTypes } = require("sequelize");

class Schema extends Model {}
Schema.init({
    data_id: {
        type: DataTypes.UUID(),
        defaultValue: DataTypes.UUIDV4()
    },
    promotional_email: {
        type: DataTypes.BOOLEAN(),
        defaultValue: false
    },
    news: {
        type: DataTypes.BOOLEAN(),
        defaultValue: true
    },
    consultation_update: {
        type: DataTypes.BOOLEAN(),
        defaultValue: true
    }
}, {
    modelName: "user-settings",
    sequelize
});

module.exports = Schema;