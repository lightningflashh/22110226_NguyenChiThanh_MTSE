import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/configDB.js";
import initWebRoutes from "./route/web.js";

dotenv.config();
const app = express();

// ✅ Xác định __dirname (vì đang dùng module type: "module")
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Cấu hình đường dẫn đến thư mục views trong src
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
initWebRoutes(app);

// DB + Server
const PORT = process.env.PORT || 3000;
connectDB();
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
