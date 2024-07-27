const Sequelize = require("sequelize");
const sequelize = require("../util/database");
const User = sequelize.define("User", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  phoneNumber: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  jobPosition:{
    type:Sequelize.STRING,
    allowNull:false,
  },companyName:{
    type:Sequelize.STRING,
    allowNull:false,

  },industry:{
    type:Sequelize.STRING,
    allowNull:false,
  },
  state:{
    type:Sequelize.STRING,
    allowNull:false,
  }
  ,city:{
    type:Sequelize.STRING,
    allowNull:false,
  }
});
module.exports = User;