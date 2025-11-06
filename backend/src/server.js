import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine.js";
import initWebRoutes from "./route/web.js";
import connectDB from "./config/configdb.js";
import dotenv from "dotenv";

dotenv.config();

let app = express();

// Config middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cấu hình view engine và routes
viewEngine(app);
initWebRoutes(app);

// Kết nối MongoDB
connectDB();

// Cổng chạy server
let port = process.env.PORT || 8686;
app.listen(port, () => {
    console.log(`🚀 Backend Node.js running on port: ${port}`);
});
