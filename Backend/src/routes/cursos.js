import express from 'express'
import CursoController from '../controllers/cursoController.js';

const router = express.Router()

router.get("/", CursoController.findAll)
router.get("/:id", CursoController.findOne)
router.post("/", CursoController.create)
router.put("/", CursoController.update)
router.delete("/:id", CursoController.remove)

export default router;