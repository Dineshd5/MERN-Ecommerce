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
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://forever-frontend-sooty-nine.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

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
