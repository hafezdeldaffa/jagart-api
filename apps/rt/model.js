const mongoose = require("mongoose");

let rtSchema = mongoose.Schema(
  {
    nomorRT: {
      type: String,
      require: [true, "Nomor RT diisi!"],
    },
    nomorRW: {
      type: String,
      require: [true, "Nomor RW harus diisi!"],
    },
    activeStatus: {
      type: String,
      enum: {
        values: ["Active", "Inactive"],
        message: "{VALUE} tidak didukung",
      },
      default: "Y",
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
    city: {
      type: String,
      require: [true, "Provinsi harus diisi!"],
    },
    zipCode: {
      type: Number,
      require: [true, "Kode Pos harus diisi!"],
    },
    member: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Warga",
      },
    ],
  },
  { timeStamps: true }
);

module.exports = mongoose.model("RT", rtSchema);
