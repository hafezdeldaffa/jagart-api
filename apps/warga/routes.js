const express = require("express");
const { getAllWarga, editWarga, deleteWarga } = require("./controller");
const router = express.Router();
const { authenticateJWT } = require("../auth/controller");

router.get("/warga", authenticateJWT, getAllWarga);
router.put("/warga", authenticateJWT, editWarga);
router.delete("/warga/:id", authenticateJWT, deleteWarga);

module.exports = router;
