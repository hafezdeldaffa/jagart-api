const express = require("express");
const routes = express.Router();
const { authenticateJWT } = require("../auth/controller");
const {
  createKeuangan,
  editKeuangan,
  getKeuangan,
  deleteKeuangan,
  getKeuanganByType,
  getKeuanganByCategory,
} = require("./controller");

routes.post("/keuangan", authenticateJWT, createKeuangan);
routes.put("/keuangan/:id", authenticateJWT, editKeuangan);
routes.delete("/keuangan/:id", authenticateJWT, deleteKeuangan);
routes.get("/keuangan", authenticateJWT, getKeuangan);
routes.get("/keuangan/type/:type", authenticateJWT, getKeuanganByType);
routes.get("/keuangan/category", authenticateJWT, getKeuanganByCategory);

module.exports = routes;
