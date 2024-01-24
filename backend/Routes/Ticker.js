import express from "express";
import { Ticker } from "../Model/Ticker.js";

const router = express.Router();

router.get("/ticker", async (req, res) => {
  try {
    const result = await Ticker.find({});
    res.json(result);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
