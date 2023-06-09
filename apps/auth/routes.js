const express = require("express");
const { signUp } = require("./controller");
const router = express.Router();
const { body } = require("express-validator");
const Warga = require("../warga/model");

router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please add a valid email")
      .custom(async (value, { req }) => {
        const warga = await Warga.findOne({ email: value });
        if (warga) {
          return new Promise.reject(
            "E-Mail sudah terdaftar, harap gunakan email lain!"
          );
        }
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 8 }),
    body("role").trim().not().isEmpty(),
  ],
  signUp
);

module.exports = router;