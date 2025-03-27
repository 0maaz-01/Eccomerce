import express from "express";
import { createProduct, deleteProduct, getRecommendedProducts, getProductsByCategory, toggleFeaturedProduct, getAllProducts, getFeaturedProducts} from "../controllers/product.controller.js";
import { protectRoute, adminRoute } from "../middleware/auth.middleware.js";

const router = express.Router();


router.get("/", protectRoute, adminRoute, getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/recommendations", getRecommendedProducts);
router.get("/category/:category", getProductsByCategory);
router.post("/", protectRoute, adminRoute, createProduct);
// patch is used when we want to update some fields and put is used when we want to update all fields.
router.patch("/:id", protectRoute, adminRoute, toggleFeaturedProduct );
router.delete("/:id", protectRoute, adminRoute, deleteProduct);


export default router;