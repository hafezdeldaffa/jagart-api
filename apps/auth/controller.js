const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { secretKey } = require("../../config/index");
const bcrypt = require("bcrypt");
const Warga = require("../warga/model");
const { errorHandling } = require("../middleware/errorHandling");
const { randomUUID } = require("crypto");
const RT = require("../rt/model");

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

    if (role === "RT") {
      const checkRT = await RT.findOne({ _id: tokenRT });

      if (checkRT.ketuaRT !== null) {
        res.status(401).json({
          message:
            "RT anda sudah memiliki ketua RT, harap mendaftar dengan role Warga",
        });
      }
    } else {
      if (tokenRT) {
        const dataRT = await RT.findById(tokenRT);
        dataRT.member.push(warga);
        await dataRT.save();
      }

      const uuid = randomUUID();
      console.log(uuid);

      if (
        familyRole === "Kepala Keluarga" ||
        familyRole === "kepala keluarga"
      ) {
        warga.tokenKeluarga = uuid;
        await warga.save();

        res.status(201).json({
          message: "Akun Warga Dibuat",
          tokenKeluarga: warga.tokenKeluarga,
          data: warga,
        });
      } else {
        await warga.save();

        res.status(201).json({
          message: "Akun Warga Dibuat",
          data: warga,
        });
      }
    }
  } catch (error) {
    errorHandling(error);
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  let user;

  try {
    const warga = await Warga.findOne({ email: email });

    if (!warga) {
      const error = new Error("Wrong email.");
      error.statusCode = 401;
      throw error;
    }

    user = warga;
    const truePassword = await bcrypt.compare(password, user.password);

    if (!truePassword) {
      const error = new Error("Wrong password.");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        email: user.email,
        password: user.password,
      },
      process.env.SECRET_KEY,
      { expiresIn: "3h" }
    );

    res.status(200).json({ message: "Login Keluarga Berhasil", token: token });
  } catch (error) {
    errorHandling(error);
    next(error);
  }
};
