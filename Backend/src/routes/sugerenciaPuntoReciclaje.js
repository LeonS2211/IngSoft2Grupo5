import express from 'express'
import sugerenciaPuntoReciclajeController from '../controllers/sugerenciaPuntoReciclajeController.js';

const { findAll, create, remove, findOne, update } = sugerenciaPuntoReciclajeController

const router = express.Router()

router.get("/", findAll)
router.post("/", create)
router.put("/", update)
router.delete("/:id", remove)
router.get("/:id", findOne)

export default router;