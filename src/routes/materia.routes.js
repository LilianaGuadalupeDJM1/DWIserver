import { Router } from "express";
import * as materiaCtrl from '../controllers/Materia.controller.js'; // Asegúrate de que el nombre coincida
import { authJwt } from "../middlewares/index.js";

const router = Router();

// Rutas para materias
router.get('/', materiaCtrl.getMaterias);
router.get('/:materiaId', materiaCtrl.getMateriaById);
router.post('/',  materiaCtrl.createMateria);
router.put('/:materiaId',  materiaCtrl.updateMateria);
router.delete('/:materiaId',  materiaCtrl.deleteMateria);

export default router;
