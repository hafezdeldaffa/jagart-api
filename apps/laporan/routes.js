const express = require("express");
const routes = express.Router();
const { authenticateJWT } = require("../auth/controller");
const {
  createLaporan,
  editLaporan,
  getLaporan,
  deleteLaporan,
  getLaporanByCategory,
  getLaporanById,
} = require("./controller");

routes.post("/laporan", authenticateJWT, createLaporan);
routes.put("/laporan/:id", authenticateJWT, editLaporan);
routes.delete("/laporan/id/:id", authenticateJWT, deleteLaporan);
routes.get("/laporan", authenticateJWT, getLaporan);
routes.get("/laporan/id/:id", authenticateJWT, getLaporanById);
routes.get("/laporan/category", authenticateJWT, getLaporanByCategory);

module.exports = routes;
