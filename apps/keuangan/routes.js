const express = require("express");
const routes = express.Router();
const { authenticateJWT } = require("../auth/controller");
const { body } = require("express-validator");
const {
  createKeuangan,
  editKeuangan,
  getKeuangan,
  deleteKeuangan,
  getTotalKeuangan,
  getKeuanganByType,
  getKeuanganByCategory,
  getKeuanganByDate,
} = require("./controller");

routes.post("/keuangan", authenticateJWT, createKeuangan);
routes.put("/keuangan/:id", authenticateJWT, editKeuangan);
routes.delete("/keuangan/:id", authenticateJWT, deleteKeuangan);

module.exports = routes;
