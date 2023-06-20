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

exports.editRT = async (req, res, next) => {
  try {
    /* Creating validation */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation error, entered data is incorrect");
      error.statusCode = 422;
      throw err;
    }

    /* Get data from request session */
    const { email } = req.user;
    const checkWarga = await Warga.findOne({ email: email });
    if (!checkWarga) {
      const error = new Error("Email tidak ditemukan");
      error.statusCode = 404;
      throw error;
    }

    /* Check if the user is the ketuaRT */
    const { tokenRT } = req.params;
    const rt = await RT.findById(tokenRT);
    if (!rt) {
      const error = new Error("RT tidak ditemukan");
      error.statusCode = 404;
      throw error;
    }

    if (rt.ketuaRT.toString() !== checkWarga._id.toString()) {
      const error = new Error("Anda bukan ketua RT");
      error.statusCode = 401;
      throw error;
    }

    /* Edit RT Data */
    const { nomorRT, nomorRW, activeStatus, address, province, city, zipCode } =
      req.body;

    const newRT = {
      nomorRT: nomorRT,
      nomorRW: nomorRW,
      activeStatus: activeStatus,
      address: address,
      province: province,
      city: city,
      zipCode: zipCode,
    };

    const updatedRT = await RT.findByIdAndUpdate(tokenRT, newRT, {
      new: true,
    });

    /* Send response */
    res.status(201).json({
      message: "RT Anda Berhasil Diubah",
      data: updatedRT,
    });
  } catch (error) {
    /* Handling Errors */
    errorHandling(error);
    next(error);
  }
};

exports.getRT = async (req, res, next) => {
  try {
    /* Creating validation */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation error, entered data is incorrect");
      error.statusCode = 422;
      throw err;
    }

    /* Get data from request params */
    const { tokenRT } = req.params;

    /* Find RT */
    const rt = await RT.findById(tokenRT)
      .populate("ketuaRT", "name email phoneNumber address")
      .populate("member", "name email phoneNumber address");

    if (!rt) {
      const error = new Error("RT tidak ditemukan");
      error.statusCode = 404;
      throw error;
    }

    /* Send response */
    res.status(200).json({
      message: "RT Anda Berhasil Ditemukan",
      data: rt,
    });
  } catch (error) {
    /* Handling Errors */
    errorHandling(error);
    next(error);
  }
};

exports.createKetuaRT = async (req, res, next) => {
  try {
    /* Creating validation */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation error, entered data is incorrect");
      error.statusCode = 422;
      throw err;
    }

    /* Get data from request body */
    const { tokenRT, email } = req.body;

    /* Find RT */
    const rt = await RT.findById(tokenRT);
    if (!rt) {
      const error = new Error("RT tidak ditemukan");
      error.statusCode = 404;
      throw error;
    }

    /* Create new RT */
    const ketuaRT = await Warga.findOne({ email: email });
    if (!ketuaRT) {
      const error = new Error("Email tidak ditemukan");
      error.statusCode = 404;
      throw error;
    }

    // const member = await Warga.find({ tokenRT: tokenRT });

    /* Save to db */
    const updatedKetuaRT = await RT.findById(tokenRT);
    updatedKetuaRT.ketuaRT = ketuaRT._id;
    // updatedKetuaRT.member = member;
    await updatedKetuaRT.save();

    const dataRT = await RT.findById(tokenRT)
      .populate("ketuaRT", "name email phoneNumber address")
      .populate("member", "name email phoneNumber address");

    res.status(201).json({
      message: "Ketua RT Berhasil Dibuat",
      data: dataRT,
    });
  } catch (error) {
    /* Handling Errors */
    errorHandling(error);
    next(error);
  }
};
