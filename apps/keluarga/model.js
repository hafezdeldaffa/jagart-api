const mongoose = require("mongoose");

let keluargaSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Nama Keluarga harus diisi!"],
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
    homeNumber: {
      type: String,
      require: [true, "Nomor Rumah harus diisi!"],
    },
    familyMembers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Warga",
      },
    ],
  },
  { timeStamps: true }
);

module.exports = mongoose.model("Keluarga", keluargaSchema);
