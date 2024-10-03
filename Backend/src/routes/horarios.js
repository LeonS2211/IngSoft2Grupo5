import express from 'express'
import horarioController from '../controllers/horarioController.js';

const { findAll, create, remove, findOne, update } = horarioController

const router = express.Router()

router.get("/", findAll)
router.post("/", create)
router.delete("/:id", remove)
router.get("/:id", findOne)
router.put("/", update)

export default router;