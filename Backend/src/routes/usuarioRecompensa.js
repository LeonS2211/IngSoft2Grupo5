import express from 'express'
import usuarioRecompensaController from '../controllers/usuarioRecompensaController.js';

const { findAll, create, remove, findOne, update } = usuarioRecompensaController

const router = express.Router()

router.get("/", findAll)
router.post("/", create)
router.put("/", update)
router.delete("/:id", remove)
router.get("/:id", findOne)

export default router;