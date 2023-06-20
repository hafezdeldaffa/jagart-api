const express = require("express");
const { createRT, createKetuaRT, editRT, getRT } = require("./controller");
const router = express.Router();
const { body } = require("express-validator");
const { authenticateJWT } = require("../auth/controller");

router.post("/rt", createRT);
router.put("/rt/:tokenRT", authenticateJWT, editRT);
router.get("/rt/:tokenRT", authenticateJWT, getRT);
router.post("/rt/ketua", authenticateJWT, createKetuaRT);

module.exports = router;
