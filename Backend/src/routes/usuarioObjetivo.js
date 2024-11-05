import express from 'express'
import usuarioObjetivoController from '../controllers/usuarioObjetivoController.js';

const { findAll, create, remove, findOne, update } = usuarioObjetivoController

const router = express.Router()

router.get("/", findAll)
router.post("/", create)
router.put("/", update)
router.delete("/:id", remove)
router.get("/:id", findOne)

export default router;