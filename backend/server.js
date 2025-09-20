// server.js
import Cors from "cors";
import "dotenv/config";
import express from "express";
import serverless from "serverless-http";

// Backends
import connectDB from "../backend/config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

// Routes
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import productRouter from "./routes/productRoute.js";
import userRouter from "./routes/userRoute.js";

// Initialize Express
const app = express();

// Connect to DB & Cloudinary
connectDB();
connectCloudinary();

// CORS Middleware
const corsMiddleware = Cors({
  origin: "https://forever-frontend-sooty-nine.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "token"],
});

// Helper to run middleware in serverless
const runMiddleware = (req, res, fn) =>
  new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      resolve(result);
    });
  });

// Apply CORS to all requests
app.use(async (req, res, next) => {
  await runMiddleware(req, res, corsMiddleware);
  next();
});

// JSON parser
app.use(express.json());

// API Routes
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Root route (health check)
app.get("/", (req, res) => {
  res.send("API Working");
});

// Catch-all fallback (404)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Export handler for Vercel
export const handler = serverless(app);
