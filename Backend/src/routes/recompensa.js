import express from 'express'
import recompensaController from '../controllers/recompensaController.js';

const { findAll, create, remove, findOne, update } = recompensaController

const router = express.Router()

router.get("/", findAll)
router.post("/", create)
router.put("/", update)
router.delete("/:id", remove)
router.get("/:id", findOne)

export default router;