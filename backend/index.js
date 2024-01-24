import express from "express";
import dotenv from "dotenv";
import connectDB from "./Config/db.js";
import { Ticker } from "./Model/Ticker.js";
import axios from "axios";
import ServerState from "./Model/Server.js";
dotenv.config();
import cors from "cors";
const app = express();
import ticker from "./Routes/Ticker.js";

connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", ticker);

// Fetch data from API and store in MongoDB
const executeOnceInLifetimeFunction = async () => {
  try {
    // Check the server state
    const serverState = await ServerState.findOne();

    if (!serverState || !serverState.functionExecuted) {
      // Execute the function only if not already executed
      try {
        const response = await axios.get(
          "https://api.wazirx.com/api/v2/tickers"
        );
        const top10Tickers = Object.values(response.data).slice(0, 10);

        top10Tickers.forEach(async (ticker) => {
          const { name, last, buy, sell, volume, base_unit } = ticker;
          await Ticker.create({ name, last, buy, sell, volume, base_unit });
        });
      } catch (error) {
        console.error("Error fetching or storing data:", error.message);
      }

      // Update the server state to indicate the function has been executed
      if (!serverState) {
        await ServerState.create({ functionExecuted: true });
      } else {
        await ServerState.updateOne({}, { functionExecuted: true });
      }
    } else {
      console.log("Function has already been executed.");
    }
  } catch (error) {
    console.error("Error executing the function:", error.message);
  }
};

// Execute the function once in a lifetime
executeOnceInLifetimeFunction();

const PORT = process.env.PORT || 7000;

app.listen(PORT, async () => {
  console.log(`server is running on port ${PORT}`);
});
