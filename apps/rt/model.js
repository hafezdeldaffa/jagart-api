const mongoose = require("mongoose");

let rtSchema = mongoose.Schema(
  {
    nomorRT: {
      type: Number,
      require: [true, "Nomor RT diisi!"],
    },
    nomorRW: {
      type: Number,
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
    ketuaRT: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Warga",
    },
    member: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Warga",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("RT", rtSchema);
