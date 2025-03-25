import express from "express";
import { login, logout, signup, refreshToken } from "../controllers/auth.controller.js"; 

const router = express.Router();

// setting up the placeholder routes that will be used http://localhost:5000/api/auth/ + placeholder (/signup, /login, /logout)
router.post("/signup", signup);  // second parameters refer to the responses that will be sent to the users.

router.post("/login", login);

router.post("/logout", logout);

router.post("/refresh-token", refreshToken)

// router.get("/profile", getProfile)

export default router;