const express = require("express");
const routes = express.Router();
const { authenticateJWT } = require("../auth/controller");
const {
  createKegiatan,
  editKegiatan,
  getKegiatan,
  deleteKegiatan,
  getKegiatanByCategory,
  getKegiatanById,
} = require("./controller");

routes.post("/kegiatan", authenticateJWT, createKegiatan);
// routes.put("/kegiatan/:id", authenticateJWT, editKegiatan);
// routes.delete("/kegiatan/id/:id", authenticateJWT, deleteKegiatan);
// routes.get("/kegiatan", authenticateJWT, getKegiatan);
// routes.get("/kegiatan/id/:id", authenticateJWT, getKegiatanById);
// routes.get("/kegiatan/category", authenticateJWT, getKegiatanByCategory);

module.exports = routes;
