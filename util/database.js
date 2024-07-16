const Sequelize = require("sequelize");
const sequelize = new Sequelize("lead_safari", "root", "r00t$x100", {
  dialect: "mysql",
  host: "localhost",
});
module.exports = sequelize;