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

exports.editKegiatan = async (req, res, next) => {
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

    /* Find Kegiatan */
    const kegiatan = await Kegiatan.findById(id);

    if (!kegiatan) {
      errorResponse(404, "Data Kegiatan tidak ditemukan", res);
    }

    if (warga.role === "Warga") {
      errorResponse(
        401,
        "Anda tidak memiliki akses untuk mengubah data ini",
        res
      );
    }

    /* Update Kegiatan */
    const newKegiatan = {
      title: title,
      description: description,
      date: new Date(date),
      category: category,
      tokenRT: warga.tokenRT,
      tokenWarga: warga._id,
    };

    const updatedKegiatan = await Kegiatan.findByIdAndUpdate(id, newKegiatan, {
      new: true,
    });

    /* Send response */
    res.status(201).json({
      message: `Data Laporan Berhasil Diubah`,
      data: updatedKegiatan,
    });
  } catch (error) {
    /* Handling Errors */
    errorHandling(error);
    next(error);
  }
};

exports.deleteKegiatan = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { email } = req.user;

    const warga = await Warga.findOne({ email: email });

    const kegiatan = await Kegiatan.findById(id);

    if (!kegiatan) {
      errorResponse(404, "Data Kegiatan tidak ditemukan", res);
    }

    if (warga.role === "Warga") {
      errorResponse(
        401,
        "Anda tidak memiliki akses untuk menghapus data ini",
        res
      );
    }

    await Kegiatan.findByIdAndDelete(id);

    res.status(200).json({
      message: `Data Laporan dengan id: ${id} Berhasil Dihapus`,
    });
  } catch (error) {
    /* Handling Errors */
    errorHandling(error);
    next(error);
  }
};

exports.getKegiatan = async (req, res, next) => {
  try {
    const email = req.user.email;

    const warga = await Warga.findOne({ email: email });

    const kegiatan = await Kegiatan.find({
      tokenRT: warga.tokenRT,
    });

    res.status(200).json({
      message: "Data Kegiatan Berhasil Didapatkan",
      data: kegiatan,
    });
  } catch (error) {
    /* Handling Errors */
    errorHandling(error);
    next(error);
  }
};

exports.getKegiatanById = async (req, res, next) => {
  try {
    const email = req.user.email;

    const { id } = req.params;

    const warga = await Warga.findOne({ email: email });

    const kegiatan = await Kegiatan.findOne({
      _id: id,
      tokenRT: warga.tokenRT,
    });

    res.status(200).json({
      message: `Data Kegiatan dengan id: ${id} Berhasil Didapatkan`,
      data: kegiatan,
    });
  } catch (error) {
    /* Handling Errors */
    errorHandling(error);
    next(error);
  }
};

exports.getKegiatanByCategory = async (req, res, next) => {
  try {
    const { category } = req.query;

    /* Get data from jwt */
    const email = req.user.email;

    /* Find Warga */
    const warga = await Warga.find({ email: email }).select("tokenRT");

    /* Find Kegiatan */
    const kegiatan = await Kegiatan.find({
      tokenRT: warga[0].tokenRT,
      category: { $regex: category, $options: "i" },
    });

    /* Send response */
    res.status(200).json({
      message: `Data Kegiatan ${category} Berhasil Ditemukan`,
      data: kegiatan,
    });
  } catch (error) {
    /* Handling Errors */
    errorHandling(error);
    next(error);
  }
};
