// Modify your MongoDB schema
import mongoose from "mongoose";
const serverStateSchema = new mongoose.Schema({
  functionExecuted: Boolean,
});

const ServerState = mongoose.model("ServerState", serverStateSchema);
export default ServerState;
