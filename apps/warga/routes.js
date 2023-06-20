const express = require("express");
const { getAllWarga } = require("./controller");
const router = express.Router();
const { authenticateJWT } = require("../auth/controller");

router.get("/warga", authenticateJWT, getAllWarga);

module.exports = router;
