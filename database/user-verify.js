const sequelize = require("./sequelize");
const { Model, DataTypes } = require("sequelize");

const generateID = () => {
    let str = "";
    let chars = "abcdefghijklmnoprqstuvwxyzABCEDFGHIJKLMNOPRQSTUVWXYZ1234567890";
    for (let i = 0; i < 51; i++) {
        str += chars[Math.floor(Math.random()*chars.length)];
    }
    return str;
}

class Schema extends Model {}
Schema.init({
    data_id: {
        type: DataTypes.UUID(),
        defaultValue: DataTypes.UUIDV4()
    },
    access_token: {
        type: DataTypes.TEXT("long"),
        defaultValue: generateID()
    },
    name: {
        type: DataTypes.TEXT("medium")
    },
    email: {
        type: DataTypes.TEXT("medium")
    }
}, {
    modelName: "user-verify",
    sequelize
});

module.exports = Schema;