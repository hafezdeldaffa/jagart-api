const { validationResult } = require("express-validator");
const { errorHandling } = require("../middleware/errorHandling");
const Warga = require("../warga/model");
const { errorResponse } = require("../middleware/errorResponse");
const Kegiatan = require("./model");

exports.createKegiatan = async (req, res, next) => {
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

    if (warga.role === "Warga") {
      errorResponse(
        401,
        "Anda tidak memiliki akses untuk membuat data kegiatan",
        res
      );
    }

    const newKegiatan = new Kegiatan({
      title: title,
      description: description,
      date: new Date(date),
      category: category,
      tokenRT: warga.tokenRT,
      tokenWarga: warga._id,
    });

    /* Save to db */
    const kegiatan = await newKegiatan.save();

    /* Send response */
    res.status(201).json({
      message: `Data Kegiatan Berhasil Dibuat`,
      data: kegiatan,
    });
  } catch (error) {
    /* Handling Errors */
    errorHandling(error);
    next(error);
  }
};
