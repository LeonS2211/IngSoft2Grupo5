import express from 'express'
import ubicacionController from '../controllers/ubicacionController.js';

const { findAll, create, remove, findOne, update } = ubicacionController

const router = express.Router()

router.get("/", findAll)
router.post("/", create)
router.put("/", update)
router.delete("/:id", remove)
router.get("/:id", findOne)

export default router;