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
