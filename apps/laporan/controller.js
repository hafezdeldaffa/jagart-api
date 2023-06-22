const { validationResult } = require("express-validator");
const { errorHandling } = require("../middleware/errorHandling");
const Warga = require("../warga/model");
const Laporan = require("../laporan/model");
const { errorResponse } = require("../middleware/errorResponse");

exports.createLaporan = async (req, res, next) => {
  try {
    /* Creating validation */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      errorResponse(422, "Validation error, data yang anda masukan salah", res);
    }

    /* Get data from jwt */
    const email = req.user.email;

    /* Get data from request body */
    const { title, description, date, category } = req.body;

    /* Find Warga */
    const warga = await Warga.findOne({ email: email });

    const newLaporan = new Laporan({
      title: title,
      description: description,
      date: new Date(date),
      category: category,
      tokenRT: warga.tokenRT,
      tokenWarga: warga._id,
    });

    /* Save to db */
    const laporan = await newLaporan.save();

    /* Send response */
    res.status(201).json({
      message: `Data Laporan Berhasil Dibuat`,
      data: laporan,
    });
  } catch (error) {
    /* Handling Errors */
    errorHandling(error);
    next(error);
  }
};

exports.editLaporan = async (req, res, next) => {
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
    const { title, description, date, category } = req.body;

    /* Find Warga */
    const warga = await Warga.findOne({ email: email });

    /* Find Laporan */
    const laporan = await Laporan.findById(id);

    if (!laporan) {
      errorResponse(404, "Data laporan tidak ditemukan", res);
    }

    if (laporan.tokenWarga.toString() !== warga._id.toString()) {
      errorResponse(
        401,
        "Anda tidak memiliki akses untuk mengubah data ini",
        res
      );
    }

    /* Update Laporan */
    const newLaporan = {
      title: title,
      description: description,
      date: new Date(date),
      category: category,
      tokenRT: warga.tokenRT,
      tokenWarga: warga._id,
    };

    const updatedLaporan = await Laporan.findByIdAndUpdate(id, newLaporan, {
      new: true,
    });

    /* Send response */
    res.status(201).json({
      message: `Data Laporan Berhasil Diubah`,
      data: updatedLaporan,
    });
  } catch (error) {
    /* Handling Errors */
    errorHandling(error);
    next(error);
  }
};
