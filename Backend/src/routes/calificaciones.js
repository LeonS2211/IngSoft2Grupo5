import express from 'express'
import calificacionController from '../controllers/calificacionController.js';

const { findAll, create, findOne, remove, update } = calificacionController

const router = express.Router()

router.get("/", findAll)
router.post("/", create)
router.get("/:id", findOne)
router.put("/", update)
router.delete("/:id", remove)

export default router;