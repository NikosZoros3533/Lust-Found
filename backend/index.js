import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import usersRoutes from "./routes/usersRoute.js";
import authRoutes from "./routes/authRoute.js";
import postsRoutes from "./routes/postsRoute.js";
import notificationRoutes from "./routes/notificationRoute.js";
import cityRoutes from "./routes/cityRoute.js";

import connectMongoDB from "./config/mongodb.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes
app.use("/users", usersRoutes);
app.use("/auth", authRoutes);
app.use("/posts", postsRoutes);
app.use("/notifications", notificationRoutes);
app.use("/cities", cityRoutes);

app.get("/", (req, res) => {
  res.send("Hello from homepage");
});

app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
  connectMongoDB();
});
