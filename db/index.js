const mongoose = require("mongoose");
const { urlDB } = require("../config");
const config = require("../config");

mongoose.set("strictQuery", false);
mongoose.connect(urlDB);

const db = mongoose.connection;

module.exports = db;