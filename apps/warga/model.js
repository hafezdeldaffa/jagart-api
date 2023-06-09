const mongoose = require("mongoose");

let wargaSchema = mongoose.Schema({
  email: {
    type: String,
    require: [true, "Email harus diisi!"],
  },
  name: {
    type: String,
    require: [true, "Nama harus diisi!"],
  },
  password: {
    type: String,
    require: [true, "Kata sandi harus diisi!"],
  },
  role: {
    type: String,
    enum: {
      values: ["Warga", "RT"],
      message: "{VALUE} tidak didukung",
    },
    default: "Warga",
  },
  familyRole: {
    type: String,
  },
  activeStatus: {
    type: String,
    enum: {
      values: ["Active", "Inactive"],
      message: "{VALUE} tidak didukung",
    },
    default: "Y",
  },
  covidStatus: {
    type: String,
    enum: {
      values: ["Positive", "Negative"],
      message: "{VALUE} tidak didukung",
    },
    default: "Negative",
  },
  phoneNumber: {
    type: String,
    require: [true, "Nomor telepon harus diisi!"],
  },
  address: {
    type: String,
    require: [true, "Alamat harus diisi!"],
  },
  province: {
    type: String,
    require: [true, "Provinsi harus diisi!"],
  },
  tokenRT: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RT",
  },
  tokenKeluarga: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Keluarga",
  }
});

module.exports = mongoose.model('Warga', wargaSchema);