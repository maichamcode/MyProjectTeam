import express from "express";

import { GetAllBill, GetOneBill, RemoveBill, addBill, searchBill } from "../controllers/bill";



const router = express.Router()

router.post('/bill/add', addBill)
router.get('/bill/:id/search', searchBill)
router.get('/bill/:id', GetOneBill)
router.get('/bill', GetAllBill)
router.delete('/bill/:id', RemoveBill)
export default router