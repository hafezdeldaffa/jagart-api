const express = require("express");
const { createRT, createKetuaRT, editRT } = require("./controller");
const router = express.Router();
const { body } = require("express-validator");
const { authenticateJWT } = require("../auth/controller");

router.post("/rt", createRT);
router.put("/rt/:tokenRT", authenticateJWT, editRT);
router.post("/rt/ketua", authenticateJWT, createKetuaRT);

module.exports = router;
