import express from "express";
import path from "path";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import usersRoutes from "./routes/usersRoute.js";
import authRoutes from "./routes/authRoute.js";
import postsRoutes from "./routes/postsRoute.js";
import notificationRoutes from "./routes/notificationRoute.js";
import cityRoutes from "./routes/cityRoute.js";
import cors from "cors";

import connectMongoDB from "./config/mongodb.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

//middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

//Routes
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/cities", cityRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.get("/", (req, res) => {
  res.send("Hello from homepage");
});

app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
  connectMongoDB();
});
