const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const VisitorSchema = new Schema(
  {
    hostname: {
      type: String,
      required: true,
    },
    uri: {
      type: String,
    },
    ip: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Visitor", VisitorSchema);
