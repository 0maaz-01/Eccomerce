import express from "express";

import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";

import cookieParser from "cookie-parser";


// to use the variables present in the .env file.
import dotenv from "dotenv";
dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

// allows us to parse the body of the request.
app.use(express.json());

// to do stuffs related to cookies.
app.use(cookieParser());

// to access the cookies in different files.
app.use("/api/auth", authRoutes);

app.use("/api/product", productRoutes);


app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
  connectDB();
});
