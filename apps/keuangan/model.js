const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const keuanganSchema = new Schema(
  {
    title: {
      type: String,
      require: [true, "Nama harus diisi!"],
    },
    description: {
      type: String,
      require: [true, "Deskripsi harus diisi!"],
    },
    amount: {
      type: Number,
      require: [true, "Jumlah harus diisi!"],
    },
    type: {
      type: String,
      enum: {
        values: ["Pemasukan", "Pengeluaran"],
        message: "{VALUE} tidak didukung",
      },
      default: "Pemasukan",
    },
    category: {
      type: String,
      enum: {
        values: [
          "Uang Kas",
          "Uang Iuran RT",
          "Uang Pemeliharaan",
          "Uang Sumbangan",
          "Lainnya",
        ],
        message: "{VALUE} tidak didukung",
      },
      default: "Lainnya",
    },
    date: {
      type: Date,
      require: [true, "Tanggal harus diisi!"],
    },
    tokenRT: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RT",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Keuangan", keuanganSchema);
