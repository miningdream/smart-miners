const sequelize = require("./sequelize");
const { Model, DataTypes } = require("sequelize");

class Schema extends Model {}
Schema.init({
    data_id: {
        type: DataTypes.UUID(),
        defaultValue: DataTypes.UUIDV4()
    },
    name: {
        type: DataTypes.TEXT("medium")
    },
    display_name: {
        type: DataTypes.TEXT("medium")
    },
    email: {
        type: DataTypes.TEXT("medium")
    },
    password: {
        type: DataTypes.TEXT("long")
    },
    avatar_name: {
        type: DataTypes.TEXT("long")
    },
    avatar_base64: {
        type: DataTypes.TEXT("long")
    },
    description: {
        type: DataTypes.TEXT("long")
    }
}, {
    modelName: "user",
    sequelize
});

module.exports = Schema;