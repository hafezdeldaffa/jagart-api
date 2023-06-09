const express = require("express");
const { createRT } = require("./controller");
const router = express.Router();
const { body } = require("express-validator");
const { authenticateJWT } = require("../auth/controller");

router.post("/rt", createRT);

module.exports = router;
