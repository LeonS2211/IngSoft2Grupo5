import express from 'express'
import comentarioComunidadController from '../controllers/comentarioComunidadController.js';

const { findAll, create, remove, findOne, update } = comentarioComunidadController

const router = express.Router()

router.get("/", findAll)
router.post("/", create)
router.put("/", update)
router.delete("/:id", remove)
router.get("/:id", findOne)

export default router;