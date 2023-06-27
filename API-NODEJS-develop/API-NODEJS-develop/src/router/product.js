import express from "express";
import { CreateProduct, RemoveProduct, getAll, getOne, getProductPriceAscending, getProductPriceDescending, searchProduct, update } from "../controllers/product";
import { checkPermission } from "../middleware/checkPermisson";

const router = express.Router()

router.post('/product/add', CreateProduct);
router.delete('/product/:id', checkPermission, RemoveProduct);
router.get('/product', getAll);
router.put("/product/:id/edit", checkPermission, update);
router.get("/product/ascend", getProductPriceAscending);
router.get("/product/descend", getProductPriceDescending);
router.get("/product/search", searchProduct)
router.get("/product/:id", getOne);

export default router