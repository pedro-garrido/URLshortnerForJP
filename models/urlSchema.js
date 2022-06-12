const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const shortid = require("shortid");

const urlSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    default: shortid.generate,
  },
  clicks: {
    type: Number,
    default: 0,
  },
});

const conectar = () =>
  mongoose.connect(
    "mongodb+srv://hardax:dXlAOmrPyUP6Ij5K@cluster0.tfewm.mongodb.net/?retryWrites=true&w=majority"
  );
const urlModel = new mongoose.model("url", urlSchema);

module.exports = {
    conectar,
    urlModel
}
