import cors from "cors";
import "dotenv/config";
import express from "express";

// backends
import connectDB from "../backend/config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

// routes
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import productRouter from "./routes/productRoute.js";
import userRouter from "./routes/userRoute.js";

// App Config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // or frontend URL
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// API endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API  Working");
});

app.listen(port, () => {
  console.log(`server is started on PORT : ${port}`);
});
