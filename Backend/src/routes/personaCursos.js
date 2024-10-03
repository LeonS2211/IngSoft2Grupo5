import express from 'express'
import personaCursoController from '../controllers/personaCursoController.js';

const { findAll, findOne, create, remove, update} = personaCursoController

const router = express.Router()

router.get("/", findAll)
router.post("/", create)
router.delete("/:id", remove)
router.get("/:id", findOne)
router.put("/", update)

export default router;