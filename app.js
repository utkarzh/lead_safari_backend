const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const sequelize = require("./util/database");
const User = require("./models/User");

const authorisationRoutes = require("./routes/authorisation");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(authorisationRoutes);

sequelize.sync({force:false}).then((_) => {
  app.listen(3000);
});