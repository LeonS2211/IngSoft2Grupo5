import express from 'express'
import objetivoController from '../controllers/objetivoController.js';

const { findAll, create, remove, findOne, update } = objetivoController

const router = express.Router()

router.get("/", findAll)
router.post("/", create)
router.put("/", update)
router.delete("/:id", remove)
router.get("/:id", findOne)

export default router;