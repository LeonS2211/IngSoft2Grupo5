import express from 'express'
import usuarioPuntoReciclajeController from '../controllers/usuarioPuntoReciclajeController.js';

const { findAll, create, remove, findOne, update } = usuarioPuntoReciclajeController

const router = express.Router()

router.get("/", findAll)
router.post("/", create)
router.put("/", update)
router.delete("/:id", remove)
router.get("/:id", findOne)

export default router;