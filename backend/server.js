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
const port = process.env.PORT || 5000;
connectDB();
connectCloudinary();

// middlewares
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "token"],
  })
);

app.use(express.json());

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
