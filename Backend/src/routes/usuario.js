import express from 'express'
import usuarioController from '../controllers/usuarioController.js';

const { findAll, create, findOne, remove, update } = usuarioController

const router = express.Router()

router.get("/", findAll)
router.post("/", create)
router.get("/:id", findOne)
router.put("/", update)
router.delete("/:id", remove)

export default router;