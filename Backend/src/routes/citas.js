import express from 'express'
import citaController from '../controllers/citaController.js';

const { findAll, create, remove, findOne, update } = citaController

const router = express.Router()

router.get("/", findAll)
router.post("/", create)
router.put("/", update)
router.delete("/:id", remove)
router.get("/:id", findOne)

export default router;