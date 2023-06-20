const express = require("express");
const {
  getAllWarga,
  editWarga,
  deleteWarga,
  getWargaByName,
} = require("./controller");
const router = express.Router();
const { authenticateJWT } = require("../auth/controller");

router.get("/warga", authenticateJWT, getAllWarga);
router.get("/warga-name", authenticateJWT, getWargaByName);
router.put("/warga", authenticateJWT, editWarga);
router.delete("/warga/:id", authenticateJWT, deleteWarga);

module.exports = router;
