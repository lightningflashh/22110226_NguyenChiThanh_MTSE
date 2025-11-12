import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import userRoutes from "./routes/user.routes";
import webRoutes from "./routes/web.routes";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", webRoutes);
app.use("/api/users", userRoutes);

export default app;