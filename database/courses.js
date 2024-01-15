const sequelize = require("./sequelize");
const { Model, DataTypes } = require("sequelize");

class Schema extends Model {}
Schema.init({
    data_id: {
        type: DataTypes.UUID(),
        defaultValue: DataTypes.UUIDV4()
    },
    title: {
        type: DataTypes.TEXT("long")
    },
    author_id: {
        type: DataTypes.TEXT("long")
    },
    short_description: {
        type: DataTypes.TEXT("long"),
        defaultValue: null
    },
    banner_name: {
        type: DataTypes.TEXT("long"),
        defaultValue: null
    },
    banner_base64: {
        type: DataTypes.TEXT("long"),
        defaultValue: null
    },
    source_name: {
        type: DataTypes.TEXT("long")
    },
    source_url: {
        type: DataTypes.TEXT("long")
    },
    price: {
        type: DataTypes.BIGINT(),
        defaultValue: 0
    },
    is_certified: {
        type: DataTypes.BOOLEAN(),
        defaultValue: false
    },
    rating: {
        type: DataTypes.TINYINT(),
        defaultValue: 1
    },
    level: {
        type: DataTypes.TINYINT(), // 0 === beginner || 1 === intermediate || 2 === advanced
        defaultValue: 0
    },
    keywords: {
        type: DataTypes.TEXT("long"),
        defaultValue: ""
    },
    start_timestamp: {
        type: DataTypes.BIGINT(),
        defaultValue: Date.now()
    },
    end_timestamp: {
        type: DataTypes.BIGINT(),
        defaultValue: null
    }
}, {
    modelName: "courses",
    sequelize
});

module.exports = Schema;