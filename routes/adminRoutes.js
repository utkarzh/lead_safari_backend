const express = require("express");
const route = express.Router();
const Admin = require("../controllers/admin");
route.post("/createLead",Admin.createLead );
route.post("/getAllLeads",Admin.getAllLeads );
route.post("/deleteLead",Admin.deleteLead );

module.exports = route;