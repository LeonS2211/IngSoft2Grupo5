import express from 'express'
import puntoReciclajeController from '../controllers/puntoReciclajeController.js';

const { findAll, create, remove, findOne, update } = puntoReciclajeController

const router = express.Router()

router.get("/", findAll)
router.post("/", create)
router.put("/", update)
router.delete("/:id", remove)
router.get("/:id", findOne)

export default router;