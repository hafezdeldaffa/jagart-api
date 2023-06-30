const express = require("express");
const {
  getAllWarga,
  editWarga,
  deleteWarga,
  getWargaByName,
  getStatusCovidWarga,
} = require("./controller");
const router = express.Router();
const { authenticateJWT } = require("../auth/controller");

router.get("/warga", authenticateJWT, getAllWarga);
router.get("/warga-name/:name", authenticateJWT, getWargaByName);
router.get("/warga/covid", authenticateJWT, getStatusCovidWarga);
router.put("/warga", authenticateJWT, editWarga);
router.delete("/warga/:id", authenticateJWT, deleteWarga);

module.exports = router;
