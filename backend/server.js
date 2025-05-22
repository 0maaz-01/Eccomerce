import express from "express";

import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import couponRoutes from "./routes/coupon.route.js";
import paymentRoutes from "./routes/payment.route.js";
import analyticsRoutes from "./routes/analytics.route.js"

import { connectDB } from "./lib/db.js";

import cookieParser from "cookie-parser";


// to use the variables present in the .env file.
import dotenv from "dotenv";
dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

// allows us to parse the body of the request.
// limit allows the user to upload image of size less than or equal to 10 mb
app.use(express.json({ limit: "10mb" })); 

// to do stuffs related to cookies.
app.use(cookieParser());

// to access the cookies in different files.
app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

app.use("/api/cart", cartRoutes);

app.use("/api/coupons", couponRoutes);

app.use("/api/payments", paymentRoutes);

app.use("/api/analytics", analyticsRoutes);



app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
  connectDB();
});
