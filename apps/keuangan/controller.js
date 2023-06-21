const { validationResult } = require("express-validator");
const { errorHandling } = require("../middleware/errorHandling");
const RT = require("./model");
const Warga = require("../warga/model");
const Keuangan = require("../keuangan/model");
const { errorResponse } = require("../middleware/errorResponse");

exports.createKeuangan = async (req, res, next) => {
  try {
    /* Creating validation */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      errorResponse(422, "Validation error, data yang anda masukan salah", res);
    }

    /* Get data from jwt */
    const email = req.user.email;

    /* Get data from request body */
    const { title, description, amount, type, category, date } = req.body;

    let keuangan;

    /* Find Warga */
    const warga = await Warga.findOne({ email: email });

    if (warga.role === "Warga") {
      errorResponse(
        401,
        "Anda tidak memiliki akses untuk membuat data keuangan",
        res
      );
    }

    /* Create new Keuangan */
    const newKeuangan = new Keuangan({
      title: title,
      description: description,
      amount: amount,
      type: type,
      category: category,
      date: new Date(date),
      tokenRT: warga.tokenRT,
    });

    /* Save to db */
    keuangan = await newKeuangan.save();

    /* Send response */
    res.status(201).json({
      message: `Data Keuangan ${type} Berhasil Dibuat`,
      data: keuangan,
    });
  } catch (error) {
    /* Handling Errors */
    errorHandling(error);
    next(error);
  }
};

exports.editKeuangan = async (req, res, next) => {
  try {
    /* Creating validation */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      errorResponse(422, "Validation error, data yang anda masukan salah", res);
    }

    /* Get data from jwt */
    const email = req.user.email;

    /* Get data from params */
    const id = req.params.id;

    /* Get data from request body */
    const { title, description, amount, type, category, date } = req.body;

    /* Find Keuangan Token RT */
    const keuanganTokenRT = await Keuangan.findById(id).select("tokenRT");

    /* Find Warga */
    const warga = await Warga.findOne({ email: email });

    if (warga.role === "Warga" && warga.tokenRT !== keuanganTokenRT.tokenRT) {
      errorResponse(
        401,
        "Anda tidak memiliki akses untuk mengubah data keuangan",
        res
      );
    }

    /* Create new Keuangan */
    const newKeuangan = {
      title: title,
      description: description,
      amount: amount,
      type: type,
      category: category,
      date: new Date(date),
      tokenRT: warga.tokenRT,
    };

    /* Save to db */
    const updatedKeuangan = await Keuangan.findByIdAndUpdate(id, newKeuangan, {
      new: true,
    });

    /* Send response */
    res.status(200).json({
      message: `Data Keuangan ${type} Berhasil Diubah`,
      data: updatedKeuangan,
    });
  } catch (error) {
    /* Handling Errors */
    errorHandling(error);
    next(error);
  }
};

exports.deleteKeuangan = async (req, res, next) => {
  try {
    /* Creating validation */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      errorResponse(422, "Validation error, data yang anda masukan salah", res);
    }

    /* Get data from jwt */
    const email = req.user.email;

    /* Get data from params */
    const id = req.params.id;

    /* Find Keuangan Token RT */
    const keuanganTokenRT = await Keuangan.findById(id).select("tokenRT");

    /* Find Warga */
    const warga = await Warga.findOne({ email: email });

    if (warga.role === "Warga" && warga.tokenRT !== keuanganTokenRT.tokenRT) {
      errorResponse(
        401,
        "Anda tidak memiliki akses untuk merubah data keuangan",
        res
      );
    }

    /* Delete Keuangan */
    await Keuangan.findByIdAndRemove(id);

    /* Send response */
    res.status(200).json({
      message: `Data Keuangan dengan id: ${id} Berhasil Dihapus`,
    });
  } catch (error) {
    /* Handling Errors */
    errorHandling(error);
    next(error);
  }
};
