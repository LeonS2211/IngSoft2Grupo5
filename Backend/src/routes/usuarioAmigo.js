import express from 'express'
import usuarioAmigoController from '../controllers/usuarioAmigoController.js';

const { findAll, create, remove, findOne, update } = usuarioAmigoController

const router = express.Router()

router.get("/", findAll)
router.post("/", create)
router.put("/", update)
router.delete("/:id", remove)
router.get("/:id", findOne)

export default router;