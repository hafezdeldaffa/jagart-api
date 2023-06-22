const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const laporanSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
      enum: ["keamanan", "kesehatan", "lainnya"],
    },
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tokenRT: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RT",
    },
    tokenWarga: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Warga",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Laporan", laporanSchema);
