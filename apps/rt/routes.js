const express = require("express");
const { createRT, createKetuaRT } = require("./controller");
const router = express.Router();
const { body } = require("express-validator");
const { authenticateJWT } = require("../auth/controller");

router.post("/rt", createRT);
router.post("/rt/ketua", authenticateJWT, createKetuaRT);

module.exports = router;
