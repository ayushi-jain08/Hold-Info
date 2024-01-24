import mongoose from "mongoose";

const tickerSchema = new mongoose.Schema({
  name: String,
  last: String,
  buy: String,
  sell: String,
  volume: String,
  base_unit: String,
});

export const Ticker = mongoose.model("ticker", tickerSchema);
