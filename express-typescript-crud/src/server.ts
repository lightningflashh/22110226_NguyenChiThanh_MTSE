import dotenv from "dotenv";
import connectDB from "./config/database";
import app from "./app";

dotenv.config();
const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}).catch(err => {
  console.error("Failed to start server", err);
});