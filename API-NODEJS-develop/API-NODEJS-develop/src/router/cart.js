import express from "express";
import { checkPermission } from "../middleware/checkPermisson";
import { GetOneCart, addToCart, deleteAllProducts, removeFromCart } from "../controllers/cart";



const router = express.Router()

router.post('/cart/add', addToCart)
router.get('/cart/:id', GetOneCart)
router.delete('/cart/:id', removeFromCart)
router.delete('/cart/:id/product', deleteAllProducts)

export default router