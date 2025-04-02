import express from "express";
import { addToCart, removeAllFromCart, updateQuantity } from "../controllers/cart.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getAllProducts } from "../controllers/product.controller.js";


const router = express.Router();

// to get all the products in the cart.
router.get("/", protectRoute, getAllProducts);

// to add a product to the cart.
router.post("/", protectRoute, addToCart);

// to remove the product with whatever quantity it was added into the cart.
router.delete("/", protectRoute, removeAllFromCart);

// to increase or decrease the quantity of a product in the cart.
router.put("/:id", protectRoute, updateQuantity);

export default router;
