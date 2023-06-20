const { validationResult } = require("express-validator");
const { errorHandling } = require("../middleware/errorHandling");
const RT = require("./model");
const Warga = require("../warga/model");

exports.getAllWarga = async (req, res, next) => {
  try {
    /* Creating validation */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation error, entered data is incorrect");
      error.statusCode = 422;
      throw err;
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
    res.status(404).json({
      message: "Data Warga di RT Anda Tidak Ditemukan",
    });
  } catch (error) {
    /* Handling Errors */
    errorHandling(error);
    next(error);
  }
};
