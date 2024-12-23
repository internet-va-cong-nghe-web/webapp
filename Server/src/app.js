import express from "express";
import cors from "cors";
import router from "./routes/index.js";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
// Lấy đường dẫn thư mục hiện tại
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, "static").replace("src", "")));

app.use("/api", router);
mongoose.connect("mongodb+srv://giahuy:user123@cluster0.zlwag.mongodb.net/novelweb_db").then(() => {
  console.log("Connect to db success");
});
app.listen(8089, () => {
  console.log("Server is running 8089 port");
});
//export const viteNodeApp = app;
