import express from 'express'
import comunidadController from '../controllers/comunidadController.js';

const { findAll, create, remove, findOne, update } = comunidadController

const router = express.Router()

router.get("/", findAll)
router.post("/", create)
router.put("/", update)
router.delete("/:id", remove)
router.get("/:id", findOne)

export default router;