const express = require("express");
const { getAllWarga, editWarga } = require("./controller");
const router = express.Router();
const { authenticateJWT } = require("../auth/controller");

router.get("/warga", authenticateJWT, getAllWarga);
router.put("/warga", authenticateJWT, editWarga);

module.exports = router;
