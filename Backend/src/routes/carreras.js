import express from 'express'
import carreraController from '../controllers/carreraController.js';

const { findAll, findOne, create, remove, update} = carreraController

const router = express.Router()

router.get("/", findAll)
router.get("/:id", findOne)
router.post("/", create)
router.put("/", update)
router.delete("/:id", remove)

export default router;