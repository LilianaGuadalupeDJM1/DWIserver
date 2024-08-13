import { Router } from "express";
import * as cursoCtrl from '../controllers/curso.controller.js'; 

const router = Router();
import { authJwt } from "../middlewares/index.js";

// Rutas para cursos
router.get('/', cursoCtrl.getCursos); // Obtener todos los cursos
router.get('/:cursoId', cursoCtrl.getCursoById); // Obtener un curso por ID
router.post('/', [authJwt.verifyToken, authJwt.isAdmin], cursoCtrl.createCurso); // Crear un nuevo curso
router.put('/:cursoId', [authJwt.verifyToken, authJwt.isAdmin], cursoCtrl.updateCursoById); // Actualizar un curso por ID
router.delete('/:cursoId', [authJwt.verifyToken, authJwt.isAdmin], cursoCtrl.deleteCursoById); // Eliminar un curso por ID

export default router;
