import express from "express";
import { CreateCategory, DeleteCategory, GetAllCategory, updateCategory, GetOneCategory } from "../controllers/category";
import { checkPermission } from "../middleware/checkPermisson";



const router = express.Router()

router.post('/category/add', checkPermission, CreateCategory)
router.put('/category/:id/edit', checkPermission, updateCategory)
router.get('/category', GetAllCategory)
router.delete('/category/:id', checkPermission, DeleteCategory)
router.get('/category/:id', GetOneCategory)



export default router