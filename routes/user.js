const express = require("express");
const jwtCheck=require('../middlewares/jwtCheck')
const route = express.Router();
const User = require("../controllers/user");
route.post("/getProfileDetails", jwtCheck.jwtCheck,User.getProfileDetails);


module.exports = route;