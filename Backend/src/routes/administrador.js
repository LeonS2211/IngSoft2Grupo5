import express from 'express'
import administradorController from '../controllers/administradorController.js';

const { findAll, create, remove, findOne, update } = administradorController

const router = express.Router()

router.get("/", findAll)
router.post("/", create)
router.put("/", update)
router.delete("/:id", remove)
router.get("/:id", findOne)

export default router;