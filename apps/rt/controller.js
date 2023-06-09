const { validationResult } = require("express-validator");
const { errorHandling } = require("../middleware/errorHandling");
const RT = require("./model");
const Warga = require("../warga/model");

exports.createRT = async (req, res, next) => {
  try {
    /* Creating validation */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation error, entered data is incorrect");
      error.statusCode = 422;
      throw err;
    }

    /* Get data from request body */
    const {
      nomorRT,
      nomorRW,
      activeStatus,
      address,
      province,
      city,
      zipcode,
      member,
    } = req.body;

    // /* Get data from jwt */
    // const { email } = req.user;

    // /* Find data keluarga by email */
    // const warga = await Warga.findOne({ email: email });

    // if (warga.tokenRT) {
    //   const error = new Error("Tidak bisa membuat RT, anda sudah memiliki RT!");
    //   error.statusCode = 500;
    //   throw err;
    // }

    /* Create new RT */
    const newRT = new RT({
      nomorRT: nomorRT,
      nomorRW: nomorRW,
      activeStatus: activeStatus,
      address: address,
      province: province,
      city: city,
      zipcode: zipcode,
      member: member,
    });

    /* Save to db */
    const rt = await newRT.save();

    /* Send response */
    res.status(201).json({
      message: "RT Anda Berhasil Dibuat",
      tokenRT: rt._id,
      data: rt,
    });
  } catch (error) {
    /* Handling Errors */
    errorHandling(error);
    next(error);
  }
};
