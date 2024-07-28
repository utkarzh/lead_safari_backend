const Sequelize = require("sequelize");
const sequelize = require("../util/database");
const Lead = sequelize.define("Lead", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  productName: {
    type: Sequelize.STRING,
    allowNull: false,
  },


  phoneNumber: {
    type: Sequelize.STRING,
    allowNull: false,
    
  },
  description:{
    type:Sequelize.STRING,
    allowNull:false,
  }
  ,companyName:{
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
module.exports = Lead;