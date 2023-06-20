const { validationResult } = require("express-validator");
const { errorHandling } = require("../middleware/errorHandling");
const RT = require("./model");
const Warga = require("../warga/model");
const { errorResponse } = require("../middleware/errorResponse");

exports.getAllWarga = async (req, res, next) => {
  try {
    /* Creating validation */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      errorResponse(422, "Validation error, data yang anda masukan salah");
    }

    /* Get data from jwt */
    const email = req.user.email;

    /* Get data from request params */
    const warga = await Warga.findOne({ email: email }).populate({
      path: "tokenRT",
      populate: { path: "member", select: "name email phoneNumber address" },
    });

    if (warga.tokenRT.member) {
      res.status(200).json({
        message: "Data Warga di RT Anda Berhasil Ditemukan",
        data: warga.tokenRT.member,
      });
    }

    /* Send response */
    errorResponse(404, "Data Warga di RT Anda Tidak Ditemukan");
  } catch (error) {
    /* Handling Errors */
    errorHandling(error);
    next(error);
  }
};

exports.getWargaByName = async (req, res, next) => {
  try {
    /* Creating validation */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      errorResponse(422, "Validation error, data yang anda masukan salah");
    }

    /* Get data from request body */
    const { name } = req.body;

    /* Find Warga */
    const warga = await Warga.find({
      name: { $regex: name, $options: "i" },
    }).select("name familyRole covidStatus activeStatus phoneNumber address");

    if (warga) {
      /* Send response */
      res.status(200).json({
        message: "Data Warga Berhasil Ditemukan",
        data: warga,
      });
    }

    /* Send response */
    errorResponse(404, "Data Warga Tidak Ditemukan");
  } catch (error) {
    /* Handling Errors */
    errorHandling(error);
    next(error);
  }
};

exports.editWarga = async (req, res, next) => {
  try {
    /* Creating validation */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      errorResponse(422, "Validation error, data yang anda masukan salah");
    }

    /* Get data from jwt */
    const email = req.user.email;

    const warga = await Warga.findOne({ email: email }).populate({
      path: "tokenRT",
      populate: { path: "member" },
    });

    if (!warga) {
      /* Send response */
      errorResponse(404, "Data Warga Tidak Ditemukan");
    }

    /* Get data from request body */
    const {
      name,
      phoneNumber,
      address,
      role,
      familyRole,
      covidStatus,
      activeStatus,
      province,
      tokenRT,
      tokenKeluarga,
    } = req.body;

    /* Update data */
    const newData = {
      name: name,
      phoneNumber: phoneNumber,
      address: address,
      role: role,
      familyRole: familyRole,
      covidStatus: covidStatus,
      activeStatus: activeStatus,
      province: province,
      tokenRT: tokenRT,
      tokenKeluarga: tokenKeluarga,
    };

    const updatedWarga = await Warga.findOneAndUpdate(
      { email: email },
      newData,
      { new: true }
    );

    /* Send response */
    res.status(200).json({
      message: "Data Anda Berhasil Diubah",
      data: updatedWarga,
    });
  } catch (error) {
    /* Handling Errors */
    errorHandling(error);
    next(error);
  }
};

exports.deleteWarga = async (req, res, next) => {
  try {
    /* Creating validation */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      errorResponse(422, "Validation error, data yang anda masukan salah");
    }

    /* Get data from jwt */
    const email = req.user.email;

    /* Find Warga */
    const warga = await Warga.findOne({ email: email });

    if (warga.role === "RT") {
      /* Get data from params */
      const { id } = req.params;

      /* Find Warga */
      await Warga.findByIdAndRemove(id);

      /* Send response */
      res.status(200).json({
        message: "Data Anda Berhasil Dihapus",
      });
    } else {
      errorResponse(401, "Anda tidak memiliki akses untuk menghapus data");
    }
  } catch (error) {
    /* Handling Errors */
    errorHandling(error);
    next(error);
  }
};
