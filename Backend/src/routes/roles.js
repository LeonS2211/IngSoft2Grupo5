import express from 'express'
import RolesController from '../controllers/rolController.js';

const router = express.Router()

router.get("/", RolesController.findAll)
router.get("/:id", RolesController.findOne)
router.post("/", RolesController.create)
router.delete("/:id", RolesController.remove)
router.put("/", RolesController.update)

export default router;