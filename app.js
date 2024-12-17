const dbConnect = require("./model/db/dbConnect");
const bodyParser = require("body-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const express = require("express");
const app = express();

dbConnect();

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth", require("./route/app/authentication"));
app.use("/usermanagement", require("./middleware/authorization"), require("./route/app/usermanagement"));
app.use("/opportunitymanagement", require("./middleware/authorization"), require("./route/app/opportunitymanagement"));

module.exports = app;
