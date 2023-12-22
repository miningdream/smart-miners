const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(process.env.DBNAME, process.env.DBUSERNAME || "root", process.env.DBPASSWORD || null, {
    host: "localhost",
    port: 3306,
    dialect: "mysql"
});

module.exports = sequelize;