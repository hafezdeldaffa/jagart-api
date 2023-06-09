const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { secretKey } = require("../../config/index");
const bcrypt = require("bcrypt");
const RT = require("../rt/model");
const Warga = require("../warga/model");
const {errorHandling} = require('../middleware/errorHandling')

exports.authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

exports.signUp = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const {
      email,
      name,
      password,
      role,
      familyRole,
      activeStatus,
      covidStatus,
      phoneNumber,
      address,
      province,
      tokenRT,
      tokenKeluarga,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 14);

    const warga = new Warga({
      email: email,
      name: name,
      password: hashedPassword,
      role: role,
      familyRole: familyRole,
      activeStatus: activeStatus,
      covidStatus: covidStatus,
      phoneNumber: phoneNumber,
      address: address,
      province: province,
      tokenRT: tokenRT,
      tokenKeluarga: tokenKeluarga,
    });

    await warga.save();

    res
      .status(201)
      .json({ message: "Akun Warga Dibuat", data: warga });
  } catch (error) {
    errorHandling(error);
    next(error);
  }
};


