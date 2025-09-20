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
const allowedOrigins =
  process.env.NODE_ENV === "development"
    ? ["http://localhost:5173"]
    : ["https://forever-frontend-beta-seven.vercel.app"];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin like Postman or server-to-server
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error("Not allowed by CORS: " + origin), false);
      }

      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "token"],
    credentials: true, // if you are sending cookies or auth headers
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
