import express from 'express'
import codigoQRController from '../controllers/codigoQRController.js';

const { findAll, create, remove, findOne, update } = codigoQRController

const router = express.Router()

router.get("/", findAll)
router.post("/", create)
router.put("/", update)
router.delete("/:id", remove)
router.get("/:id", findOne)

export default router;