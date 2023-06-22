const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const kegiatanSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      require: true,
    },
    date: {
      type: Date,
      require: true,
    },
    category: {
      type: String,
      enum: {
        values: ["sosial", "pendidikan", "keagamaan", "olahraga", "lainnya"],
        message: "{VALUE} tidak didukung",
      },
      default: "lainnya",
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

module.exports = mongoose.model("Kegiatan", kegiatanSchema);
