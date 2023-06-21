const express = require("express");
const routes = express.Router();
const { authenticateJWT } = require("../auth/controller");
const { body } = require("express-validator");
const {
  createKeuangan,
  editKeuangan,
  getKeuangan,
  deleteKeuangan,
  getAllKeuangan,
  getKeuanganByType,
  getKeuanganByCategory,
  getKeuanganByDate,
} = require("./controller");

routes.post("/keuangan", authenticateJWT, createKeuangan);

module.exports = routes;
