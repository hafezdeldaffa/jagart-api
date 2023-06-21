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

    if (type === "Pemasukan") {
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
    } else {
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
    }

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
